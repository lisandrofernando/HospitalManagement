import Image from "next/image";
import { redirect } from "next/navigation";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const NewAppointment = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const patient = await getPatient(userId);

  if (!patient) redirect(`/patient/${userId}/register`);

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <section className="remove-scrollbar container overflow-y-auto h-screen">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 mx-auto">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            userId={userId}
            patientId={patient.$id}
            primaryPhysician={patient.primaryPhysician}
            type="create"
          />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="sticky top-0 h-screen w-[390px] min-w-[390px] object-cover"
      />
    </div>
  );
};

export default NewAppointment;
