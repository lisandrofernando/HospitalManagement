"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
}

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(acceptedFiles[0]);
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-slate-700 bg-slate-950 p-5 text-center"
    >
      <input {...getInputProps()} />
      {preview ? (
        files?.[0]?.type === "application/pdf" ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <Image src="/assets/icons/upload.svg" width={40} height={40} alt="pdf" />
            <p className="text-sm font-medium text-emerald-400">{files[0].name}</p>
            <p className="text-xs text-slate-500">PDF uploaded successfully</p>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="uploaded document"
            className="max-h-[300px] w-full object-contain"
          />
        )
      ) : (
        <>
          <Image src="/assets/icons/upload.svg" width={40} height={40} alt="upload" />
          <div className="space-y-1">
            <p className="text-sm text-slate-400">
              <span className="text-emerald-500">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
};
