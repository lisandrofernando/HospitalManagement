"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const Register = () => {
  const { userId } = useParams<{ userId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    Promise.all([getUser(userId), getPatient(userId)]).then(([fetchedUser, patient]) => {
      if (patient) { router.replace(`/patient/${userId}/new-appointment`); return; }

      const resolved = fetchedUser ?? {
        $id: userId,
        name: name ? decodeURIComponent(name) : "",
        email: email ? decodeURIComponent(email) : "",
        phone: "",
      };

      if (!resolved.name && !resolved.email) { router.replace("/"); return; }

      setUser(resolved);
      setReady(true);
    });
  }, [userId, searchParams, router]);

  if (!ready) return null;

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <section className="remove-scrollbar container overflow-y-auto h-screen">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="patient" className="h-10 w-fit" />
            <LanguageToggle />
          </div>

          <RegisterForm user={user} />

          <p className="copyright py-12">{t("copyrightShort")}</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="sticky top-0 h-screen w-[390px] min-w-[390px] object-cover"
      />
    </div>
  );
};

export default Register;
