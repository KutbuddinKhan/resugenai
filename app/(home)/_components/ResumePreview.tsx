"use client"

import CertificatesPreview from '@/components/preview/CertificatesPreview'
import EducationPreview from '@/components/preview/EducationPreview'
import ExperiencePreview from '@/components/preview/ExperiencePreview'
import PersonalInfo from '@/components/preview/PersonalInfo'
import ProjectsPreview from '@/components/preview/ProjectsPreview'
import SkillsPreview from '@/components/preview/SkillsPreview'
import SummaryPreview from '@/components/preview/SummaryPreview'
import { useResumeContext } from '@/context/resume-info-provider'
import { cn } from '@/lib/utils'
import React from 'react'

const ResumePreview = () => {
  const { resumeInfo } = useResumeContext();

  const isLoading = false
  return (
    <div
      id="resume-preview-id"
      className={cn(
        `shadow-lg bg-white w-full flex-[1.02] h-full p-10 !font-open-sans dark:border dark:bg-card dark:border-b-gray-800 dark:border-x-gray-800`
      )}
      style={{
        borderTop: `13px solid ${resumeInfo?.themeColor}`
      }}
    >
      {/* Personal info */}
      <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Professional EXp */}
      <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Educational Info */}
      <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Certificates */}
      <CertificatesPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Projexts */}
      <ProjectsPreview isLoading={isLoading} resumeInfo={resumeInfo} />


      {/* Skills */}
      <SkillsPreview isLoading={isLoading} resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreview