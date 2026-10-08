"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const PasskeyModal = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...passkey];
    updated[index] = value;
    setPasskey(updated);
    setError("");
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !passkey[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = passkey.join("");
    if (code.length < 6) {
      setError(t("enterAllDigits"));
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (code === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      localStorage.setItem("accessKey", code);
      router.push("/admin");
    } else {
      setError(t("invalidPasskey"));
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPasskey(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
        <button onClick={handleClose} className="absolute right-4 top-4 text-slate-400 hover:text-white">
          <Image src="/assets/icons/close.svg" width={20} height={20} alt="close" />
        </button>

        <div className="mb-6 space-y-1">
          <h2 className="text-xl font-semibold text-white">{t("adminAccess")}</h2>
          <p className="text-sm text-slate-400">{t("enterPasskey")}</p>
        </div>

        <div className={`flex justify-between gap-2 mb-4 ${shake ? "animate-shake" : ""}`}>
          {passkey.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`h-14 w-full rounded-lg border bg-slate-950 text-center text-xl font-bold text-white outline-none transition ${
                error ? "border-rose-500 focus:border-rose-400" : "border-slate-600 focus:border-emerald-500"
              }`}
            />
          ))}
        </div>

        {error && <p className="mb-4 text-sm text-rose-400">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-emerald-500 py-3 text-sm font-medium text-white hover:bg-emerald-600 transition"
        >
          {t("verifyPasskey")}
        </button>
      </div>
    </div>
  );
};

export default PasskeyModal;
