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
import { Loader2, Sparkles } from "lucide-react";
import React, { useCallback, useState } from "react";

// Interfaces for type safety
interface GeneratesSummaryType {
    fresher: string;
    mid: string;
    experienced: string;
}

interface SummaryItem {
    experienceLevel: string;
    summary: string[];
}

interface AIResponse {
    summaries: SummaryItem[];
}

// Detailed AI generation prompt
const prompt = `Job Title: {jobTitle}. Generate comprehensive, concise resume summaries in JSON format for three experience levels: fresher, mid-level, and experienced. Each summary should be:
- 3-4 lines long
- Engaging and tailored to a Software Developer role
- Highlight specific programming languages, tools, frameworks, and methodologies
- Demonstrate personal tone, unique strengths, and growth trajectory
- Align with industry standards

Respond ONLY with a valid JSON object in this exact structure:
{
  "summaries": [
    {
      "experienceLevel": "Fresher",
      "summary": ["Summary text for fresher level"]
    },
    {
      "experienceLevel": "Mid-level",
      "summary": ["Summary text for mid-level"]
    },
    {
      "experienceLevel": "Experienced",
      "summary": ["Summary text for experienced level"]
    }
  ]
}

Ensure no placeholders, maximum relevance, clarity, and impact.`;

const SummaryForm = (props: { handleNext: () => void }) => {
    const { handleNext } = props;
    const { resumeInfo, onUpdate } = useResumeContext();
    const { mutateAsync, isPending } = useUpdateDocument();

    // State management
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummary, setAiGeneratedSummary] = 
        useState<GeneratesSummaryType | null>(null);

    // Handle textarea change
    const handleChange = (e: { target: { value: string } }) => {
        const { value } = e.target;
        const resumeDataInfo = resumeInfo as ResumeDataType;
        const updatedInfo = {
            ...resumeDataInfo,
            summary: value,
        };
        onUpdate(updatedInfo);
    };

    // Submit form handler
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

    // AI Summary Generation
    const GenerateSummaryFromAI = async () => {
        try {
            // Validate job title
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
    
            // Prepare and send AI prompt
            const PROMPT = prompt.replace("{jobTitle}", jobTitle);
            const result = await AIChatSession.sendMessage(PROMPT);
    
            const responseText = await result.response.text();
    
            // Robust JSON parsing
            let parsedResponse: AIResponse;
            try {
                // Clean response and parse
                const cleanedResponse = responseText
                    .replace(/```json\n?/g, '')   // Remove code block markers
                    .replace(/```/g, '')          // Remove any other code block markers
                    .trim();                      // Remove leading/trailing whitespace
                
                parsedResponse = JSON.parse(cleanedResponse);
            } catch (parseError) {
                console.error("JSON Parsing Error:", parseError);
                console.error("Raw Response:", responseText);
                
                toast({
                    title: "AI Response Error",
                    description: "Failed to parse AI response. Please try again.",
                    variant: "destructive",
                });
                return;
            }
    
            // Validate response structure
            if (!parsedResponse || !parsedResponse.summaries || !Array.isArray(parsedResponse.summaries)) {
                toast({
                    title: "Invalid AI Response",
                    description: "The AI response does not match the expected format.",
                    variant: "destructive",
                });
                return;
            }
    
            // Process summaries
            const summaries = parsedResponse.summaries.reduce(
                (acc: GeneratesSummaryType, item: { experienceLevel: string; summary: string[] }) => {
                    const experienceLevel = item.experienceLevel
                        .toLowerCase()
                        .replace(/mid[-\s]?level/, "mid") as keyof GeneratesSummaryType;
            
                    if (!acc[experienceLevel] && item.summary.length > 0) {
                        acc[experienceLevel] = item.summary[0];
                    }
                    return acc;
                },
                { fresher: "", mid: "", experienced: "" }
            );
            
            // Additional validation
            if (!summaries.fresher || !summaries.mid || !summaries.experienced) {
                toast({
                    title: "Incomplete AI Response",
                    description: "Could not generate complete summaries. Please try again.",
                    variant: "destructive",
                });
                return;
            }
    
            setAiGeneratedSummary(summaries);
        } catch (error) {
            console.error("Comprehensive Error in GenerateSummaryFromAI:", error);
            toast({
                title: "Failed to generate summary",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Select AI generated summary
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
                            onClick={GenerateSummaryFromAI}
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
                        {isPending && <Loader2 size="15px" className="animate-spin" />}
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SummaryForm;