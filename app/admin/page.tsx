"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAppointments } from "@/lib/actions/appointment.actions";
import AppointmentsTable from "@/components/AppointmentsTable";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

const AdminPage = () => {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    getAppointments().then((data) => setAppointments(data?.documents ?? []));
  }, []);

  const counts = {
    scheduled: appointments.filter((a) => a.status === "scheduled").length,
    pending: appointments.filter((a) => a.status === "pending").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <Image src="/assets/icons/logo-full.svg" width={1000} height={1000} alt="logo" className="h-8 w-fit" />
        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-400">{t("adminDashboard")}</p>
          <LanguageToggle />
          <a href="/" className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition">
            {t("home")}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("welcomeAdmin")}</h1>
          <p className="text-slate-400 text-sm mt-1">{t("manageAppointments")}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { labelKey: "scheduled" as const, count: counts.scheduled, icon: "/assets/icons/appointments.svg", style: "text-emerald-400" },
            { labelKey: "pending" as const, count: counts.pending, icon: "/assets/icons/pending.svg", style: "text-yellow-400" },
            { labelKey: "cancelled" as const, count: counts.cancelled, icon: "/assets/icons/cancelled.svg", style: "text-rose-400" },
          ].map(({ labelKey, count, icon, style }) => (
            <div key={labelKey} className="rounded-xl border border-slate-700 bg-slate-900 p-6 flex items-center gap-4">
              <Image src={icon} width={32} height={32} alt={labelKey} />
              <div>
                <p className={`text-3xl font-bold ${style}`}>{count}</p>
                <p className="text-sm text-slate-400">{t(labelKey)} {t("appointments")}</p>
              </div>
            </div>
          ))}
        </div>

        <AppointmentsTable appointments={appointments} />
      </main>
    </div>
  );
};

export default AdminPage;
