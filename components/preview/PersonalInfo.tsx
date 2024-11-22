"use client";

import React, { FC } from 'react';
import { ResumeDataType } from "@/types/resume.type";
import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { Skeleton } from '../ui/skeleton';
import { Github, Linkedin } from 'lucide-react';

interface PropsType {
    resumeInfo: ResumeDataType | undefined;
    isLoading: boolean;
}

const PersonalInfo: FC<PropsType> = ({
    resumeInfo,
    isLoading
}) => {
    const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

    if (isLoading) {
        return <SkeletonLoader />;
    }
    
    return (
        <div className='w-full min-h-14'>
            {/* Full Name */}
            <h2 
                className='font-bold text-xl text-center'
                style={{ color: themeColor }}
            >
                {resumeInfo?.personalInfo?.firstName || "First Name"}{" "}
                {resumeInfo?.personalInfo?.lastName || "Last Name"}
            </h2>
            
            {/* Job Title */}
            <h5 className='text-center text-sm font-medium'>
                {resumeInfo?.personalInfo?.jobTitle || "Job Title"}
            </h5>
            
            {/* Address */}
            <p className='text-center font-normal text-[13px]'>
                {resumeInfo?.personalInfo?.address || "Home Address"}
            </p>

            {/* Contact Information */}
            <div className='flex items-center justify-between pt-3'>
                <h5 className='font-normal text-[13px]'>
                    {resumeInfo?.personalInfo?.phone || "Phone Number"}
                </h5>
                <h5 className='font-normal text-[13px]'>
                    {resumeInfo?.personalInfo?.email || "Email Address"}
                </h5>
                {/* LinkedIn and Portfolio Links */}
            <div className='flex gap-2 items-center justify-between pt-3'>
                {resumeInfo?.personalInfo?.linkedin && (
                    <a 
                        href={resumeInfo.personalInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className='text-[13px] text-primary underline'
                    >
                        <Linkedin size='16px' />
                        
                    </a>
                )}
                {resumeInfo?.personalInfo?.portfolio && (
                    <a 
                        href={resumeInfo.personalInfo.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className='flex text-[13px] border text-primary underline'
                    >
                        <Github size='16px' className='mr-1' /> Portfolio
                    </a>
                )}
            </div>
            </div>

            {/* Divider */}
            <hr 
                className='border-[1.5px] my-2'
                style={{ borderColor: themeColor }}
            />

            
        </div>
    );
};

// Skeleton Loader Component
const SkeletonLoader = () => {
    return (
        <div className="w-full min-h-14">
            <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/4 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
            <div className="flex justify-between pt-3">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-[1.5] w-full my-2" />
        </div>
    );
}

export default PersonalInfo;
