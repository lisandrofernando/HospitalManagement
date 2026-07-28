import Image from "next/image";
import Link from "next/link";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";

const AppointmentSuccess = async ({ params, searchParams }: SearchParamProps) => {
  const { userId } = await params;
  const { appointmentId } = await searchParams as any;
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find((d) => d.name === appointment?.primaryPhysician);
  const scheduledDate = appointment?.schedule
    ? new Date(appointment.schedule).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="flex h-screen max-h-screen items-center justify-center px-6">
      <div className="flex flex-col items-center text-center space-y-6 max-w-[480px]">
        <Image src="/assets/icons/logo-full.svg" width={1000} height={1000} alt="logo" className="h-10 w-fit" />

        <Image src="/assets/gifs/success.gif" width={280} height={280} alt="success" unoptimized />

        <h2 className="header">Your appointment request has been <span className="text-emerald-500">successfully submitted!</span></h2>
        <p className="text-dark-700">We will be in touch shortly to confirm your appointment.</p>

        <div className="w-full rounded-xl border border-slate-700 bg-slate-900 p-6 space-y-4">
          <p className="text-sm text-slate-400 uppercase tracking-widest">Requested appointment details</p>

          {doctor && (
            <div className="flex items-center gap-3">
              <Image src={doctor.image} width={40} height={40} alt={doctor.name} className="rounded-full" />
              <p className="text-white font-medium">Dr. {doctor.name}</p>
            </div>
          )}

          {scheduledDate && (
            <div className="flex items-center gap-3">
              <Image src="/assets/icons/calendar.svg" width={20} height={20} alt="calendar" />
              <p className="text-slate-300 text-sm">{scheduledDate}</p>
            </div>
          )}
        </div>

        <Link href={`/patient/${userId}/new-appointment`} className="text-emerald-500 hover:text-emerald-400 text-sm">
          Book another appointment →
        </Link>

        <Link href="/" className="text-slate-400 hover:text-white text-sm">
          ← Back to home
        </Link>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
