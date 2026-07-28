"use client";

import Image from "next/image";
import { useState } from "react";
import { Doctors } from "@/constants";
import AppointmentActions from "@/components/AppointmentActions";

const PAGE_SIZE = 10;

const AppointmentsTable = ({ appointments }: { appointments: any[] }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(appointments.length / PAGE_SIZE);
  const slice = appointments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700">
        <h2 className="font-semibold text-white">All Appointments</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 text-left">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Doctor</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Reason</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-500">No appointments found.</td>
              </tr>
            )}
            {slice.map((appt, i) => {
              const doctor = Doctors.find((d) => d.name === appt.primaryPhysician);
              const date = new Date(appt.schedule).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
              });
              return (
                <tr key={appt.$id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                  <td className="px-6 py-4 text-slate-400">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="px-6 py-4 font-medium text-white">{appt.patient?.name ?? appt.userid ?? "—"}</td>
                  <td className="px-6 py-4">
                    {doctor ? (
                      <div className="flex items-center gap-2">
                        <Image src={doctor.image} width={28} height={28} alt={doctor.name} className="rounded-full" />
                        <span className="text-slate-300">Dr. {doctor.name}</span>
                      </div>
                    ) : (
                      <span className="text-slate-500">{appt.primaryPhysician}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{date}</td>
                  <td className="px-6 py-4 text-slate-400 max-w-[200px] truncate">{appt.reason ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      appt.status === "scheduled" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      appt.status === "pending"   ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                                                    "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>{appt.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <AppointmentActions appointment={appt} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700">
          <p className="text-sm text-slate-400">
            Page {page} of {totalPages} · {appointments.length} total
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700 transition disabled:opacity-40"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700 transition disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;
