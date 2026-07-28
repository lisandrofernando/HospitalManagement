"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ isLoading, children, className }: SubmitButtonProps) => (
  <Button
    type="submit"
    disabled={isLoading}
    className={`w-full bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 ${className ?? ""}`}
  >
    {isLoading ? (
      <div className="flex items-center gap-2">
        <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24} className="animate-spin" />
        Loading...
      </div>
    ) : (
      children
    )}
  </Button>
);

export default SubmitButton;
