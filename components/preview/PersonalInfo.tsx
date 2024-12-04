"use client";
import React, { FC } from 'react';
import { ResumeDataType } from "@/types/resume.type";
import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { Skeleton } from '../ui/skeleton';
import { Github, Linkedin, ExternalLink } from 'lucide-react';

interface PropsType {
    resumeInfo: ResumeDataType | undefined;
    isLoading: boolean;
}

const PersonalInfo: FC<PropsType> = ({ resumeInfo, isLoading }) => {
    const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="text-center space-y-2 p-4 bg-white shadow-sm rounded-lg">
            <h1 
                className="text-2xl font-bold" 
                style={{ color: themeColor }}
            >
                {resumeInfo?.personalInfo?.firstName || "First Name"}{" "}
                {resumeInfo?.personalInfo?.lastName || "Last Name"}
            </h1>
            
            <h2 className="text-lg text-gray-600 font-medium">
                {resumeInfo?.personalInfo?.jobTitle || "Job Title"}
            </h2>
            
            <div className="text-sm text-gray-500 space-y-1">
                <p>{resumeInfo?.personalInfo?.address || "Home Address"}</p>
                
                <div className="flex justify-center space-x-4 pt-2">
                    <a href={`tel:${resumeInfo?.personalInfo?.phone}`} className="hover:text-blue-600">
                        {resumeInfo?.personalInfo?.phone || "Phone Number"}
                    </a>
                    <a href={`mailto:${resumeInfo?.personalInfo?.email}`} className="hover:text-blue-600">
                        {resumeInfo?.personalInfo?.email || "Email Address"}
                    </a>
                </div>
                
                <div className="flex justify-center space-x-4 pt-2">
                    {resumeInfo?.personalInfo?.linkedin && (
                        <a 
                            href={resumeInfo.personalInfo.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-blue-700"
                        >
                            <Linkedin size={20} className="mr-1" /> LinkedIn
                        </a>
                    )}
                    
                    {resumeInfo?.personalInfo?.portfolio && (
                        <a 
                            href={resumeInfo.personalInfo.portfolio} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-green-700"
                        >
                            <ExternalLink size={20} className="mr-1" /> Portfolio
                        </a>
                    )}
                </div>
            </div>
            
            <hr className="border-t-2 border-gray-200 my-2" />
        </div>
    );
};

// Skeleton Loader Component
const SkeletonLoader = () => {
    return (
        <div className="space-y-4 p-4 bg-white shadow-sm rounded-lg">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-center space-x-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;