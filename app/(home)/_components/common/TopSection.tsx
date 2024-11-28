'use client'

import { useResumeContext } from '@/context/resume-info-provider'
import { AlertCircle } from 'lucide-react'
import React, { useCallback } from 'react'
import ResumeTitle from './ResumeTitle'
import ThemeColor from './ThemeColor'
import PreviewModal from './PreviewModal'
import Download from './Download'
import Share from './Share'
import MoreOption from './MoreOption'
import useUpdateDocument from '@/features/document/use-update-documents'
import { toast } from '@/hooks/use-toast'

const TopSection = () => {
    const { resumeInfo, isLoading, onUpdate } = useResumeContext()
    const { mutateAsync, isPending } = useUpdateDocument()

    const handleTitle = useCallback(
        (title: string) => {
            if (title === "Untitled Resume" && !title) return 

            if (resumeInfo) {
                onUpdate({
                    ...resumeInfo,
                    title: title,
                })
            }

            mutateAsync(
                {
                    title: title,
                },
                {
                    onSuccess: () => {
                        toast({
                            title: 'Resume updated successfully',
                            description: "Updated your resume successfully. You can now share it with others or download it as a PDF file."
                        })
                    },
                    onError: () => {
                        toast({
                            title: 'Error updating resume',
                            description: "Failed to update your resume. Please try again later.",
                            variant: "destructive"
                        })
                    }
                }
            )
        },
        [resumeInfo, onUpdate]
    )

    return (
        <>
            {resumeInfo?.status === "archived" && (
                <div className='fixed z-50 inset-x-0 top-0 bg-rose-500 text-center text-sm sm:text-base p-2 text-white flex items-center gap-x-2 justify-center font-medium'>
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Resume is archived</span>
                </div>
            )}
            <div className='w-full flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-3 space-y-3 sm:space-y-0'>
                <div className='flex items-center gap-2 w-full sm:w-auto'>
                    <ResumeTitle
                        isLoading={isLoading || isPending}
                        initialTitle={resumeInfo?.title || ""}
                        status={resumeInfo?.status}
                        onSave={(value) => handleTitle(value)}
                    />
                </div>
                <div className='flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end'>

                    {/* theme Color */}
                    <ThemeColor />
                    
                    {/* Preview Modal */}
                    <PreviewModal />

                    {/* Download Resume */}
                    <Download 
                        title={resumeInfo?.title || "Untitled Resume"}
                        status={resumeInfo?.status}
                        isLoading={isLoading}
                    />

                    <Share />
                    <MoreOption />
                </div>
            </div>
        </>
    )
}

export default TopSection