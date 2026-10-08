"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { useLanguage } from "@/context/LanguageContext";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  scheduled: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  cancelled: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

type Appointment = {
  $id: string;
  status: string;
  primaryPhysician: string;
  schedule: string;
  reason?: string;
  note?: string;
  cancellationReason?: string;
  patient?: { name?: string };
  userid?: string;
};

const AppointmentActions = ({ appointment }: { appointment: Appointment }) => {
  const router = useRouter();
  const { t } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState(appointment.cancellationReason ?? "");
  const [schedule, setSchedule] = useState(
    new Date(appointment.schedule).toISOString().slice(0, 16)
  );
  const [physician, setPhysician] = useState(appointment.primaryPhysician);
  const [error, setError] = useState("");

  const originalSchedule = new Date(appointment.schedule).toISOString().slice(0, 16);
  const hasChanges = schedule !== originalSchedule || physician !== appointment.primaryPhysician;

  const doctor = Doctors.find((d) => d.name === physician);
  const date = new Date(appointment.schedule).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
  const patientName = appointment.patient?.name ?? appointment.userid ?? "—";

  const saveChanges = () => {
    startTransition(async () => {
      await updateAppointment(appointment.$id, { status: appointment.status as Status, schedule: new Date(schedule).toISOString(), primaryPhysician: physician });
      router.refresh();
    });
  };

  const update = (status: Status, extra?: { cancellationReason: string }) => {
    startTransition(async () => {
      await updateAppointment(appointment.$id, { status, schedule: new Date(schedule).toISOString(), primaryPhysician: physician, ...extra });
      setOpen(false);
      router.refresh();
    });
  };

  const handleCancel = () => {
    if (!cancelReason.trim()) { setError(t("provideCancellationReason")); return; }
    update("cancelled", { cancellationReason: cancelReason });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-slate-600 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700 transition"
      >
        {t("manage")}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{t("appointmentDetails")}</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white text-xl leading-none">✕</button>
            </div>

            {/* Details */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{t("detailPatient")}</span>
                <span className="text-sm font-medium text-white">{patientName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{t("detailDoctor")}</span>
                <div className="flex items-center gap-2">
                  {doctor && <Image src={doctor.image} width={24} height={24} alt={doctor.name} className="rounded-full" />}
                  <select
                    value={physician}
                    onChange={(e) => setPhysician(e.target.value)}
                    className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-1.5 text-sm text-white outline-none focus:border-emerald-500 transition"
                  >
                    {Doctors.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{t("detailDate")}</span>
                <span className="text-sm text-white">{date}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{t("detailReason")}</span>
                <span className="text-sm text-white">{appointment.reason ?? "—"}</span>
              </div>

              {appointment.note && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{t("detailNotes")}</span>
                  <span className="text-sm text-white">{appointment.note}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{t("detailStatus")}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[appointment.status] ?? ""}`}>
                  {appointment.status}
                </span>
              </div>
            </div>

            {/* Date & time */}
            <div className="space-y-2">
              <label className="text-sm text-slate-400">{t("dateTime")}</label>
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500 transition [color-scheme:dark]"
                />
                {hasChanges && (
                  <button
                    onClick={saveChanges}
                    disabled={isPending}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition disabled:opacity-40 whitespace-nowrap"
                  >
                    {isPending ? t("saving") : t("save")}
                  </button>
                )}
              </div>
            </div>

            {/* Cancellation reason input */}
            <div className="space-y-2">
              <label className="text-sm text-slate-400">{t("cancellationReasonLabel")} <span className="text-slate-600">{t("cancellationReasonHint")}</span></label>
              <textarea
                value={cancelReason}
                onChange={(e) => { setCancelReason(e.target.value); setError(""); }}
                placeholder={t("cancellationReasonPlaceholder")}
                rows={3}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-rose-500 transition resize-none"
              />
              {error && <p className="text-sm text-rose-400">{error}</p>}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => update("pending")}
                disabled={isPending || appointment.status === "pending"}
                className="flex-1 rounded-lg border border-yellow-500/30 bg-yellow-500/10 py-2 text-sm text-yellow-400 hover:bg-yellow-500/20 transition disabled:opacity-40"
              >
                {t("pendingAction")}
              </button>
              <button
                onClick={() => update("scheduled")}
                disabled={isPending || appointment.status === "scheduled"}
                className="flex-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-2 text-sm text-emerald-400 hover:bg-emerald-500/20 transition disabled:opacity-40"
              >
                {t("scheduleAction")}
              </button>
              <button
                onClick={handleCancel}
                disabled={isPending || appointment.status === "cancelled"}
                className="flex-1 rounded-lg bg-rose-500 py-2 text-sm font-medium text-white hover:bg-rose-600 transition disabled:opacity-40"
              >
                {isPending ? t("saving") : t("cancelAction")}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentActions;
