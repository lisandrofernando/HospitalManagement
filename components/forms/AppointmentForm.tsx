"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

import "react-datepicker/dist/react-datepicker.css";

type AppointmentFormProps = {
  userId: string;
  patientId: string;
  primaryPhysician: string;
  type: "create" | "schedule" | "cancel";
  appointmentId?: string;
};

const AppointmentForm = ({ userId, patientId, primaryPhysician, type, appointmentId }: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentSchema = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema) as any,
    defaultValues: {
      primaryPhysician,
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentSchema>) => {
    setIsLoading(true);
    try {
      if (type === "create") {
        const appointment = await createAppointment({
          userid: userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: values.schedule,
          reason: values.reason!,
          note: values.note,
          status: "pending",
        });
        if (appointment) {
          router.push(`/patient/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
        }
      }
      // schedule / cancel handled by admin panel (future)
    } catch (error) {
      console.error("Appointment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonLabel = { create: "Book Appointment", schedule: "Confirm Schedule", cancel: "Cancel Appointment" }[type];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Book your appointment in seconds.</p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
              renderTrigger={() => {
                const selected = Doctors.find((d) => d.name === form.watch("primaryPhysician"));
                return selected ? (
                  <div className="flex items-center gap-2">
                    <Image src={selected.image} width={24} height={24} alt={selected.name} className="rounded-full" />
                    <span>{selected.name}</span>
                  </div>
                ) : null;
              }}
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image src={doctor.image} width={32} height={32} alt={doctor.name} className="rounded-full border border-dark-500" />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="Annual monthly check-up"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Additional notes"
                placeholder="Prefer afternoon appointments, if possible"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up, please reschedule"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={type === "cancel" ? "bg-red-500 hover:bg-red-600 w-full" : "w-full"}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
