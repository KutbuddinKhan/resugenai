"use client";

import PreviewResume from "../../../../(public)/_components/PreviewResume";
import Error from "../../../../(public)/_components/Error";
import useGetDocument from "@/features/document/use-get-document-by-id";
import { ResumeDataType } from "@/types/resume.type";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const PublicResume = () => {
    const param = useParams();
    const documentId = param.documentId as string;
    const { data, isSuccess, isLoading } = useGetDocument(documentId, true);

    const resumeInfo = (data?.data ?? {}) as ResumeDataType;

    if (!isLoading && !isSuccess) {
        return <Error />;
    }

    return (
        <div className="w-full min-h-screen h-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100">
            {/* Navbar */}
            <nav className='w-full px-8 border-b sticky top-0 z-50 border-gray-700 bg-black/60 backdrop-blur-sm h-14 flex items-center'>
                <div className="flex items-center gap-3">
                    <Image
                        src="/pdf_icon.png"
                        alt="PDF logo"
                        width={32}
                        height={32}
                        className="rounded-md shadow-md"
                    />
                    <h5 className="text-xl font-semibold text-gray-200 tracking-wide">
                        {resumeInfo?.title || "Untitled Resume"}.pdf
                    </h5>
                </div>
            </nav>

            {/* Main Content */}
            <div className="w-full flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-6">
                <div className="max-w-[90%] mx-auto mt-6 lg:max-w-[60%] w-full bg-gradient-to-tl from-gray-100 to-gray-200 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
                    <PreviewResume
                        {...{
                            resumeInfo,
                            isLoading,
                        }}
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full text-center py-4 mt-4 border-t border-gray-700 bg-black/80">
                <p className="text-sm text-gray-400">
                    Powered by <span className="text-blue-400 font-semibold">ResuGenie.ai</span>. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default PublicResume;
