"use client";

import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const admin = searchParams.get("admin");
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 lg:flex-row">
      {admin === "true" && <PasskeyModal />}
      <section className="flex w-full flex-col justify-between px-6 py-8 sm:px-10 lg:w-[50%] lg:px-12 lg:py-12">
        <div className="mx-auto flex w-full max-w-[496px] flex-col">
          <div className="mb-10 flex items-center justify-between">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="CarePulse logo"
              className="h-10 w-auto"
            />
            <LanguageToggle />
          </div>

          <PatientForm />

          <div className="mt-8 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>{t("copyright")}</p>
            <Link
              href="/?admin=true"
              className="font-medium text-emerald-500 transition hover:text-emerald-400"
            >
              {t("adminLogin")}
            </Link>
          </div>
        </div>
      </section>

      <div className="hidden lg:flex lg:w-[50%] lg:items-center lg:justify-center">
        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="Patient onboarding illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
