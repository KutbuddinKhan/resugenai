import CertificatesPreview from '@/components/preview/CertificatesPreview';
import EducationPreview from '@/components/preview/EducationPreview';
import ExperiencePreview from '@/components/preview/ExperiencePreview';
import PersonalInfo from '@/components/preview/PersonalInfo';
import ProjectsPreview from '@/components/preview/ProjectsPreview';
import SkillPreview from '@/components/preview/SkillsPreview';
import SummaryPreview from '@/components/preview/SummaryPreview';
import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { ResumeDataType } from '@/types/resume.type'
import React from 'react'

const PreviewResume = (props: {
    isLoading: boolean;
    resumeInfo: ResumeDataType;
}) => {
    const { isLoading, resumeInfo } = props;
    const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;
    return (
        <div
            className={cn(`
                shadow-lg !bg-white w-full flex-[1.02] h-full p-10 !font-open-sans !text-black
        `)}
            style={{
                borderTop: `13px solid ${resumeInfo?.themeColor}`,
            }}
        >

            {/* Personal Info */}
            <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />

            {/* Summary */}
            <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />

            {/* Professional Experience */}
            <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />

            {/* Education */}
            <div className='-mt-32'>
                <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />
            </div>

            {/* Certificate */}
            <CertificatesPreview isLoading={isLoading} resumeInfo={resumeInfo} />

            {/* Project */}
            <ProjectsPreview isLoading={isLoading} resumeInfo={resumeInfo} />

            {/* Skill */}
            <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />

        </div>
    )
}

export default PreviewResume