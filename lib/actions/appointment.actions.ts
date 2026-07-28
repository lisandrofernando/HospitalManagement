"use server";

import { ID, Query } from "node-appwrite";
import { databases } from "@/lib/appwrite.config";
import { DATABASE_ID, APPOINTMENT_COLLECTION_ID } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import twilio from "twilio";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error: any) {
    console.error("createAppointment error:", JSON.stringify(error, null, 2));
    throw error;
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error("getAppointment error:", error);
    return null;
  }
};

export const getAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!
    );
    return parseStringify(appointments);
  } catch (error) {
    console.error("getAppointments error:", error);
    return null;
  }
};

export const updateAppointment = async (appointmentId: string, data: { status: Status; cancellationReason?: string; schedule?: string; primaryPhysician?: string }) => {
  try {
    const updated = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      data
    );
    return parseStringify(updated);
  } catch (error) {
    console.error("updateAppointment error:", error);
    throw error;
  }
};

export const sendSmsNotification = async (to: string, message: string) => {
  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER!,
      to,
      body: message,
    });
  } catch (error) {
    console.error("sendSmsNotification error:", error);
    throw error;
  }
};
