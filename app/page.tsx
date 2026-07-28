import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams: Promise<{ admin?: string }> }) {
  const { admin } = await searchParams;
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 lg:flex-row">
      {admin === "true" && <PasskeyModal />}
      <section className="flex w-full flex-col justify-between px-6 py-8 sm:px-10 lg:w-[50%] lg:px-12 lg:py-12">
        <div className="mx-auto flex w-full max-w-[496px] flex-col">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="CarePulse logo"
            className="mb-10 h-10 w-auto"
          />

          <PatientForm />

          <div className="mt-8 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 CarePulse. All rights reserved.</p>
            <Link
              href="/?admin=true"
              className="font-medium text-emerald-500 transition hover:text-emerald-400"
            >
              Admin Login
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
