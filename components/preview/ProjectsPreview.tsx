import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { ResumeDataType } from '@/types/resume.type';
import React, { FC } from 'react';
import SkeletonLoader from '../skeleton-loader';

interface PropsType {
    resumeInfo: ResumeDataType | undefined;
    isLoading: boolean;
}

const ProjectsPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
    const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className='w-full my-5'>
            <h5 className='text-center font-bold mb-2' style={{ color: themeColor }}>
                Projects
            </h5>
            <hr className='border-[1.5px] my-2' style={{ borderColor: themeColor }} />

            <div className='flex flex-col gap-2 min-h-9'>
                {resumeInfo?.projects?.map((project, index) => (
                    <div key={index}>
                        <h5 className='text-[15px] font-bold' style={{ color: themeColor }}>
                            {project?.title}
                        </h5>
                        <div className='flex items-start justify-between mb-1'>
                            <span className='text-[13px]'>{project?.startDate} - {project?.endDate}</span>
                            {project?.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className='text-[13px] underline' style={{ color: themeColor }}>
                                    View Project
                                </a>
                            )}
                        </div>
                        <p className='text-[13px] my-1'>{project?.description}</p>
                        <div className='text-[12px] italic text-gray-500'>
                            Tech Stack: {project?.techStack?.join(', ')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPreview;
