"use client"

import { useResumeContext } from '@/context/resume-info-provider'
import { AlertCircle } from 'lucide-react'
import React from 'react'
import ResumeTitle from './ResumeTitle'
import ThemeColor from './ThemeColor'
import PreviewModal from './PreviewModal'
import Download from './Download'
import Share from './Share'
import MoreOption from './MoreOption'

const TopSection = () => {
    const { resumeInfo, onUpdate } = useResumeContext()

    return (
        <>
            {resumeInfo?.status === "archived" && (
                <div className='absolute z-[9] inset-0 h-6 top-0 bg-rose-500 text-center text-base p-2 text-white flex items-center gap-x-2 justify-center font-medium'>
                    <AlertCircle size='16px' />
                    <span>Resume is archived</span>
                </div>
            )}
            <div className='w-full flex items-center justify-between border-b pb-3'>
                <div className='flex items-center gap-2'>
                    <ResumeTitle
                    isLoading={false}
                        initialTitle={resumeInfo?.title || ""}
                        status={resumeInfo?.status}
                        // onSave={(value) => handleTitle(value)}
                        onSave={(value) => console.log(value)}
                    />
                </div>
                <div className='flex items-center gap-2'>
                    {/* theme color */}
                    <ThemeColor />

                    {/* Preview Modal */}
                    <PreviewModal />

                    {/* Donwload Resume */}
                    <Download

                    />

                    {/* Share Resume */}
                    <Share />

                    {/* More options */}
                    <MoreOption />
                </div>
            </div>
        </>
    )
}

export default TopSection