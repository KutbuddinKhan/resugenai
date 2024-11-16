import React, { FC } from "react";
import SkeletonLoader from "@/components/skeleton-loader";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";

interface PropsType {
    resumeInfo: ResumeDataType | undefined;
    isLoading: boolean;
}

// Helper function to convert rating to skill level
const getSkillLevel = (rating: number) => {
    if (rating >= 4.5) return "Expert";
    if (rating >= 3.5) return "Advanced";
    if (rating >= 2.5) return "Intermediate";
    return "Beginner";
};

const SkillPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
    const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="w-full my-8 rounded-lg">
            <h5
                className="text-center font-bold mb-2"
                style={{ color: themeColor }}
            >
                Skills
            </h5>

            <hr
                className="border-[1.5px] my-2"
                style={{
                    borderColor: themeColor,
                }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {resumeInfo?.skills?.map((skill, index) => (
                    <div
                        key={index}
                        className="flex flex-col space-y-2"
                    >
                        {/* Skill Name and Rating */}
                        <div className="flex justify-between items-center">
                            <h5 className="text-sm font-semibold text-gray-700 dark:text-white">
                                {skill?.name}
                            </h5>
                            {skill?.rating && skill?.name && (
                                <span className="text-xs text-gray-500 font-medium dark:text-white">
                                    {getSkillLevel(skill.rating)}
                                </span>
                            )}
                        </div>

                        {/* Skill Bar */}
                        {skill?.rating && skill?.name && (
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-300 ease-in-out"
                                    style={{
                                        background: themeColor,
                                        width: `${skill?.rating * 20}%`,
                                    }}
                                />
                            </div>
                        )}

                        {/* Skill Percentage (optional) */}
                        {skill?.rating && skill?.name && (
                            <div className="text-right text-xs text-gray-400 dark:text-gray-300">
                                {skill.rating * 20}%
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillPreview;
