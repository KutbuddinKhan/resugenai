"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-documents";
import { toast } from "@/hooks/use-toast";
import { AIChatSession } from "@/lib/gemini-ai-model";
import { generateThumbnail } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import { Loader, Sparkles } from "lucide-react";
import React, { useCallback, useState } from "react";

interface GeneratesSummaryType {
    fresher: string;
    mid: string;
    experienced: string;
}

const prompt = `Job Title: {jobTitle}. Generate comprehensive, concise resume summaries in JSON format for three experience levels: fresher, mid-level, and experienced. Each summary should be 3-4 lines, engaging, and tailored to the role of a Software Developer. Highlight specific programming languages, tools, frameworks, and methodologies relevant to this job. The summaries should demonstrate a strong personal tone, unique strengths, growth trajectory, and collaborative achievements, aligning with industry standards. Avoid placeholders, ensuring relevance, clarity, and impact at each experience level.`;

const SummaryForm = (props: { handleNext: () => void }) => {
    const { handleNext } = props;
    const { resumeInfo, onUpdate } = useResumeContext();

    const { mutateAsync, isPending } = useUpdateDocument();

    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummary, setAiGeneratedSummary] =
        useState<GeneratesSummaryType | null>(null);

    const handleChange = (e: { target: { value: string } }) => {
        const { value } = e.target;
        const resumeDataInfo = resumeInfo as ResumeDataType;
        const updatedInfo = {
            ...resumeDataInfo,
            summary: value,
        };
        onUpdate(updatedInfo);
    };

    const handleSubmit = useCallback(
        async (e: { preventDefault: () => void }) => {
            e.preventDefault();

            if (!resumeInfo) return;

            const thumbnail = await generateThumbnail();
            const currentNo = resumeInfo?.currentPosition
                ? resumeInfo?.currentPosition + 1
                : 1;

            await mutateAsync(
                {
                    currentPosition: currentNo,
                    thumbnail: thumbnail,
                    summary: resumeInfo?.summary,
                },
                {
                    onSuccess: () => {
                        toast({
                            title: "Success",
                            description: "Summary updated successfully",
                        });
                        handleNext();
                    },
                    onError() {
                        toast({
                            title: "Error",
                            description: "Failed to update summary",
                            variant: "destructive",
                        });
                    },
                }
            );
        },
        [handleNext, mutateAsync, resumeInfo]
    );

    const GenerateSummaryFromAI = async () => {
        try {
            const jobTitle = resumeInfo?.personalInfo?.jobTitle;
            if (!jobTitle) {
                toast({
                    title: "Missing Job Title",
                    description: "Please provide a job title to generate the summary.",
                    variant: "destructive",
                });
                return;
            }

            setLoading(true);

            const PROMPT = prompt.replace("{jobTitle}", jobTitle);
            const result = await AIChatSession.sendMessage(PROMPT);

            // Extract raw text response
            const responseText = await result.response.text();

            console.log(responseText);

            // Validate JSON response
            try {
                const parsedResponse = JSON.parse(responseText);

                if (Array.isArray(parsedResponse.summaries)) {
                    // Remove duplicates and normalize experience levels
                    const summaries = parsedResponse.summaries.reduce(
                        (acc: GeneratesSummaryType, item: any) => {
                            const experienceLevel =
                                item.experienceLevel.toLowerCase().replace(/mid[-\s]?level/, "mid") as keyof GeneratesSummaryType;

                            if (!acc[experienceLevel]) {
                                acc[experienceLevel] = item.summary[0]; // Assuming summary is an array
                            }
                            return acc;
                        },
                        { fresher: "", mid: "", experienced: "" } // Initial value
                    );

                    setAiGeneratedSummary(summaries);
                } else {
                    throw new Error("Unexpected response structure.");
                }
            } catch (jsonError) {
                console.error("Error parsing AI response as JSON:", jsonError);
                toast({
                    title: "Failed to generate summary",
                    description: "The AI response could not be parsed. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error generating summary:", error);
            toast({
                title: "Failed to generate summary",
                description: "An error occurred while processing the AI response.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };


    const handleSelect = useCallback(
        (summary: string) => {
            if (!resumeInfo) return;

            const resumeDataInfo = resumeInfo as ResumeDataType;
            const updatedInfo = {
                ...resumeDataInfo,
                summary: summary,
            };
            onUpdate(updatedInfo);
            setAiGeneratedSummary(null);
        },
        [onUpdate, resumeInfo]
    );

    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Summary</h2>
                <p className="text-sm">Add summary for your resume</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-end justify-between">
                        <Label>Add Summary</Label>
                        <Button
                            variant="outline"
                            type="button"
                            className="gap-1"
                            disabled={loading || isPending}
                            onClick={() => GenerateSummaryFromAI()}
                        >
                            <Sparkles size="15px" className="text-primary" />
                            Generate with AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5 min-h-36"
                        required
                        value={resumeInfo?.summary || ""}
                        onChange={handleChange}
                    />

                    {aiGeneratedSummary && (
                        <div>
                            <h5 className="font-semibold text-[15px] my-4">Suggestions</h5>
                            {Object.entries(aiGeneratedSummary).map(([experienceType, summary], index) => (
                                <Card
                                    role="button"
                                    key={index}
                                    className="my-4 bg-primary/5 shadow-none border-primary/30"
                                    onClick={() => handleSelect(summary)}
                                >
                                    <CardHeader className="py-2">
                                        <CardTitle className="font-semibold text-md">
                                            {experienceType.charAt(0).toUpperCase() + experienceType.slice(1)}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <p>{summary}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}


                    <Button
                        className="mt-4"
                        type="submit"
                        disabled={
                            isPending || loading || resumeInfo?.status === "archived"
                                ? true
                                : false
                        }
                    >
                        {isPending && <Loader size="15px" className="animate-spin" />}
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SummaryForm;
