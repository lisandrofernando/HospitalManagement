"use server";

import { ID, Query } from "node-appwrite";

import { databases, storage, users } from "@/lib/appwrite.config";
import { DATABASE_ID, PATIENT_COLLECTION_ID } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";

export type CreateUserParams = {
  name: string;
  email: string;
  phone: string;
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify({ $id: user.$id, name: user.name, email: user.email, phone: user.phone });
  } catch {
    return null;
  }
};

export const getPatient = async (userId: string) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID!, PATIENT_COLLECTION_ID!, [
      Query.equal("userid", userId),
    ]);
    return result.documents[0] ? parseStringify(result.documents[0]) : null;
  } catch {
    return null;
  }
};

export const registerPatient = async (patient: RegisterUserParams) => {
  try {
    const { identificationDocument, ...rest } = patient as any;

    let fileId;
    if (identificationDocument) {
      const blob = identificationDocument.get("blobFile") as Blob;
      const fileName = identificationDocument.get("fileName") as string;
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const file = await storage.createFile(
        process.env.NEXT_PUBLIC_ID!,
        ID.unique(),
        new File([buffer], fileName, { type: blob.type })
      );
      fileId = file.$id;
    }

    const documentData = {
      ...rest,
      gender: rest.gender?.toLowerCase(),
      ...(fileId && { identificationDocumentId: fileId }),
    };
    console.log("Sending to Appwrite:", JSON.stringify(documentData, null, 2));

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      documentData
    );

    return parseStringify(newPatient);
  } catch (error: any) {
    console.error("registerPatient error:", JSON.stringify(error, null, 2));
    throw error;
  }
};

export const createuser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone || undefined,
      undefined,
      user.name,
    );

    return { $id: newUser.$id, name: newUser.name, email: newUser.email };
  } catch (error: any) {
    if (error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      const existing = documents?.users?.[0];
      return existing ? { $id: existing.$id, name: existing.name, email: existing.email } : null;
    }

    throw error;
  }
};