import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { ResumeDataType } from '@/types/resume.type';
import React, { FC } from 'react';
import SkeletonLoader from '../skeleton-loader';

interface PropsType {
    resumeInfo: ResumeDataType | undefined;
    isLoading: boolean;
}

const CertificatesPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
    const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className='w-full my-5'>
            <h5 className='text-center font-bold mb-2' style={{ color: themeColor }}>
                Certificates
            </h5>
            <hr className='border-[1.5px] my-2' style={{ borderColor: themeColor }} />

            <div className='flex flex-col gap-2 min-h-9'>
                {resumeInfo?.certificates?.map((certificate, index) => (
                    <div key={index}>
                        <h5 className='text-[15px] font-bold' style={{ color: themeColor }}>
                            {certificate?.title}
                        </h5>
                        <div className='flex items-start justify-between mb-1'>
                            <span className='text-[13px] italic'>
                                Issued by {certificate?.issuer}
                            </span>
                            <span className='text-[13px]'>{certificate?.issueDate}</span>
                        </div>
                        <p className='text-[13px] my-1'>{certificate?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CertificatesPreview;
