import { ResumeDataType } from "@/types/resume.type";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";


interface PropsType {
    resumeInfo: ResumeDataType | undefined;
    isLoading: boolean
}

const SummaryPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
    return (
        <div className="w-full min-h-10">
            {isLoading ? (
                <Skeleton className="h-6 w-full" />
            ) : (
                <p className="text-[13px] !leading-4">
                    {resumeInfo?.summary ||
                        "No summary provided. Please add a summary to your resume."
                    }
                </p>
            )}
        </div>
    )
}

export default SummaryPreview