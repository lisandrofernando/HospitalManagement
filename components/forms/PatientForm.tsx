"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { createuser } from "@/lib/actions/patient.actions";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PatientForm = () => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("+1");
  const [countryName, setCountryName] = useState("US");
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const phoneValue = watch("phone") ?? "";

  const countryOptions = useMemo(
    () => [
      { code: "+1", name: "US", label: "United States", flag: "🇺🇸" },
      { code: "+1", name: "CA", label: "Canada", flag: "🇨🇦" },
      { code: "+52", name: "MX", label: "Mexico", flag: "🇲🇽" },
      { code: "+55", name: "BR", label: "Brazil", flag: "🇧🇷" },
      { code: "+44", name: "GB", label: "United Kingdom", flag: "🇬🇧" },
      { code: "+33", name: "FR", label: "France", flag: "🇫🇷" },
      { code: "+49", name: "DE", label: "Germany", flag: "🇩🇪" },
      { code: "+34", name: "ES", label: "Spain", flag: "🇪🇸" },
      { code: "+39", name: "IT", label: "Italy", flag: "🇮🇹" },
      { code: "+351", name: "PT", label: "Portugal", flag: "🇵🇹" },
      { code: "+31", name: "NL", label: "Netherlands", flag: "🇳🇱" },
      { code: "+32", name: "BE", label: "Belgium", flag: "🇧🇪" },
      { code: "+46", name: "SE", label: "Sweden", flag: "🇸🇪" },
      { code: "+47", name: "NO", label: "Norway", flag: "🇳🇴" },
      { code: "+45", name: "DK", label: "Denmark", flag: "🇩🇰" },
      { code: "+91", name: "IN", label: "India", flag: "🇮🇳" },
      { code: "+92", name: "PK", label: "Pakistan", flag: "🇵🇰" },
      { code: "+880", name: "BD", label: "Bangladesh", flag: "🇧🇩" },
      { code: "+94", name: "LK", label: "Sri Lanka", flag: "🇱🇰" },
      { code: "+977", name: "NP", label: "Nepal", flag: "🇳🇵" },
      { code: "+81", name: "JP", label: "Japan", flag: "🇯🇵" },
      { code: "+82", name: "KR", label: "South Korea", flag: "🇰🇷" },
      { code: "+86", name: "CN", label: "China", flag: "🇨🇳" },
      { code: "+65", name: "SG", label: "Singapore", flag: "🇸🇬" },
      { code: "+60", name: "MY", label: "Malaysia", flag: "🇲🇾" },
      { code: "+63", name: "PH", label: "Philippines", flag: "🇵🇭" },
      { code: "+66", name: "TH", label: "Thailand", flag: "🇹🇭" },
      { code: "+84", name: "VN", label: "Vietnam", flag: "🇻🇳" },
      { code: "+62", name: "ID", label: "Indonesia", flag: "🇮🇩" },
      { code: "+95", name: "MM", label: "Myanmar", flag: "🇲🇲" },
      { code: "+856", name: "LA", label: "Laos", flag: "🇱🇦" },
      { code: "+855", name: "KH", label: "Cambodia", flag: "🇰🇭" },
      { code: "+670", name: "TL", label: "Timor-Leste", flag: "🇹🇱" },
      { code: "+61", name: "AU", label: "Australia", flag: "🇦🇺" },
      { code: "+64", name: "NZ", label: "New Zealand", flag: "🇳🇿" },
      { code: "+213", name: "DZ", label: "Algeria", flag: "🇩🇿" },
      { code: "+216", name: "TN", label: "Tunisia", flag: "🇹🇳" },
      { code: "+212", name: "MA", label: "Morocco", flag: "🇲🇦" },
      { code: "+225", name: "CI", label: "Côte d’Ivoire", flag: "🇨🇮" },
      { code: "+221", name: "SN", label: "Senegal", flag: "🇸🇳" },
      { code: "+233", name: "GH", label: "Ghana", flag: "🇬🇭" },
      { code: "+234", name: "NG", label: "Nigeria", flag: "🇳🇬" },
      { code: "+254", name: "KE", label: "Kenya", flag: "🇰🇪" },
      { code: "+255", name: "TZ", label: "Tanzania", flag: "🇹🇿" },
      { code: "+256", name: "UG", label: "Uganda", flag: "🇺🇬" },
      { code: "+250", name: "RW", label: "Rwanda", flag: "🇷🇼" },
      { code: "+267", name: "BW", label: "Botswana", flag: "🇧🇼" },
      { code: "+260", name: "ZM", label: "Zambia", flag: "🇿🇲" },
      { code: "+263", name: "ZW", label: "Zimbabwe", flag: "🇿🇼" },
      { code: "+27", name: "ZA", label: "South Africa", flag: "🇿🇦" },
      { code: "+20", name: "EG", label: "Egypt", flag: "🇪🇬" },
      { code: "+966", name: "SA", label: "Saudi Arabia", flag: "🇸🇦" },
      { code: "+971", name: "AE", label: "United Arab Emirates", flag: "🇦🇪" },
      { code: "+974", name: "QA", label: "Qatar", flag: "🇶🇦" },
      { code: "+965", name: "KW", label: "Kuwait", flag: "🇰🇼" },
      { code: "+968", name: "OM", label: "Oman", flag: "🇴🇲" },
      { code: "+962", name: "JO", label: "Jordan", flag: "🇯🇴" },
      { code: "+961", name: "LB", label: "Lebanon", flag: "🇱🇧" },
      { code: "+963", name: "SY", label: "Syria", flag: "🇸🇾" },
      { code: "+964", name: "IQ", label: "Iraq", flag: "🇮🇶" },
      { code: "+90", name: "TR", label: "Turkey", flag: "🇹🇷" },
      { code: "+380", name: "UA", label: "Ukraine", flag: "🇺🇦" },
      { code: "+7", name: "RU", label: "Russia", flag: "🇷🇺" },
    ],
    [],
  );

  useEffect(() => {
    const selectedCountry = countryOptions.find((option) => option.name === countryName);
    if (selectedCountry) {
      setCountryCode(selectedCountry.code);
    }
  }, [countryName, countryOptions]);

  const onSubmit = async (data: FormValues) => {
    // Strip all non-digits, then remove leading digits that match the country code digits
    const digitsOnly = data.phone?.replace(/\D/g, "") ?? "";
    const countryDigits = countryCode.replace("+", "");
    const normalizedPhone = digitsOnly.startsWith(countryDigits)
      ? digitsOnly.slice(countryDigits.length)
      : digitsOnly;

    if (!data.name?.trim()) {
      setError("name", { type: "manual", message: "Name is required" });
      return;
    }

    if (!data.email?.trim()) {
      setError("email", { type: "manual", message: "Email is required" });
      return;
    }

    if (!data.phone?.trim()) {
      setError("phone", { type: "manual", message: "Phone number is required" });
      return;
    }

    if (normalizedPhone.length < 10) {
      setError("phone", { type: "manual", message: "Phone number must be at least 10 digits" });
      return;
    }

    clearErrors("phone");

    try {
      const user = await createuser({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: normalizedPhone ? `${countryCode}${normalizedPhone}` : "",
      });

      const userId = user?.$id ?? "guest";
      router.push(`/patient/${userId}/register`);
    } catch (error: any) {
      console.error("Failed to create patient account", error);
      setError("email", {
        type: "manual",
        message: error?.message ?? "Failed to create account. Please try again.",
      });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
      <div className="mb-6 space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
          Patient Portal
        </p>
        <h1 className="text-2xl font-semibold text-white">Book your visit</h1>
        <p className="text-sm text-slate-400">
          Enter your details to continue to CarePulse.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-300" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
            placeholder="Alex Morgan"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-rose-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
            placeholder="alex@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-rose-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300" htmlFor="phone">
            Phone number
          </label>
          <div className="flex gap-2">
            <select
              value={countryName}
              onChange={(event) => setCountryName(event.target.value)}
              className="w-28 rounded-lg border border-slate-700 bg-slate-950 px-2 py-2 text-sm text-white outline-none"
              aria-label="Country"
            >
              {countryOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.flag} {option.code}
                </option>
              ))}
            </select>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              value={phoneValue}
              onChange={(event) => {
                setValue("phone", event.target.value, { shouldValidate: false });
                if (event.target.value.trim()) {
                  clearErrors("phone");
                }
              }}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
              placeholder="55 1234 5678"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {countryOptions.find((option) => option.name === countryName)?.flag} {countryOptions.find((option) => option.name === countryName)?.label} · {countryCode}
          </p>
          {errors.phone && (
            <p className="mt-1 text-sm text-rose-400">{errors.phone.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
          Continue
        </Button>
      </form>
    </div>
  );
};

export default PatientForm;