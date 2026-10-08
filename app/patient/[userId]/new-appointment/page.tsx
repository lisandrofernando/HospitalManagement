"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const NewAppointment = () => {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const { t } = useLanguage();
  const [patient, setPatient] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getPatient(userId).then((p) => {
      if (!p) { router.replace(`/patient/${userId}/register`); return; }
      setPatient(p);
      setReady(true);
    });
  }, [userId, router]);

  if (!ready) return null;

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <section className="remove-scrollbar container overflow-y-auto h-screen">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="logo" className="h-10 w-fit" />
            <LanguageToggle />
          </div>

          <AppointmentForm
            userId={userId}
            patientId={patient.$id}
            primaryPhysician={patient.primaryPhysician}
            type="create"
          />

          <p className="copyright py-12">{t("copyrightShort")}</p>
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
