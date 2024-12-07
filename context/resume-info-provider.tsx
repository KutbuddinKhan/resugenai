"use client";

import useGetDocument from "@/features/document/use-get-document-by-id";
import { ResumeDataType } from "@/types/resume.type";
import { useParams } from "next/navigation";
import React, { createContext, FC, useContext, useEffect, useState } from "react";

type ResumeContextType = {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
  onUpdate: (data: ResumeDataType) => void;
};

export const ResumeInfoContext = createContext<ResumeContextType | undefined>(
  undefined
);

type RawCertificateType = {
  id?: number;
  docId?: number | null;
  title?: string | null;
  issuer?: string | null;
  issueDate?: string | null;
  description?: string | null;
};

type RawResumeDataType = {
  id: number;
  documentId: string;
  userId: string;
  title: string;
  summary: string | null;
  themeColor: string;
  thumbnail: string | null;
  currentPosition: number;
  status: "archived" | "private" | "public";
  certificates: RawCertificateType[];
};

const sanitizeResumeData = (data: RawResumeDataType): ResumeDataType => ({
  ...data,
  certificates: data.certificates.map((cert) => ({
    id: cert.id ?? 0,
    title: cert.title || "",
    description: cert.description || null,
    docId: cert.docId ?? null,
    issuer: cert.issuer || "",
    issueDate: cert.issueDate || null,
  })),
});

export const ResumeInfoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const param = useParams();
  const documentId = param.documentId as string;

  const { data, isSuccess, isLoading, isError, refetch } = useGetDocument(documentId);

  const [resumeInfo, setResumeInfo] = useState<ResumeDataType | undefined>();

  useEffect(() => {
    if (isSuccess && data?.data) {
      setResumeInfo(sanitizeResumeData(data.data as RawResumeDataType));
    }
  }, [data?.data, isSuccess]);

  const onUpdate = (data: ResumeDataType) => {
    setResumeInfo(data);
  };

  return (
    <ResumeInfoContext.Provider
      value={{
        resumeInfo,
        isSuccess,
        isLoading,
        isError,
        refetch,
        onUpdate,
      }}
    >
      {children}
    </ResumeInfoContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeInfoContext);
  if (!context) {
    throw new Error("useResumeContext must be used within ResumeInfoProvider");
  }
  return context;
};
