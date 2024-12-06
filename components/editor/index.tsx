import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Loader2, Sparkles } from 'lucide-react';

import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnUnderline,
    Editor,
    EditorProvider,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg';
import { toast } from '@/hooks/use-toast';
import { AIChatSession } from '@/lib/gemini-ai-model';

type RichTextEditorProps = {
    jobTitle: string | null;
    initialValue: string;
    onEditorChange: (e: unknown) => void;
};

const PROMPT = `Given the job title "{jobTitle}",
create a concise list of 6-7 personalized bullet points in HTML stringify format.
Each point should emphasize key skills, relevant technologies, and significant contributions from that role.
Avoid including the job title itself in the output.
Provide the bullet points only within an unordered list (<ul>...</ul>).`;

const RichTextEditor = (props: RichTextEditorProps) => {
    const { jobTitle, initialValue, onEditorChange } = props;

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(initialValue || '');

    const generateSummaryFromAI = async () => {
        try {
          if (!jobTitle || typeof jobTitle !== 'string') {
            toast({
              title: 'Must provide a valid Job position',
              variant: 'destructive',
            });
            return;
          }
      
          setLoading(true);
      
          // Replace placeholder in the prompt
          const prompt = PROMPT.replace('{jobTitle}', jobTitle);
      
          // Call AI API
          const result = await AIChatSession.sendMessage(prompt);
          const responseText = await result.response.text();
      
          // Log the raw AI response for debugging
        //   console.log('AI Response Text:', responseText);
      
          // Parse the response
          let parsedResponse;
          try {
            parsedResponse = JSON.parse(responseText);
          } catch (jsonError) {
            // console.error('JSON Parsing Error:', jsonError);
            throw new Error(`Invalid response format from AI. ${jsonError}`);
          }
      
          // Extract and validate bullet points
          const bulletPoints = parsedResponse?.bulletPoints;
          if (!bulletPoints || !bulletPoints.startsWith('<ul>')) {
            // console.error('Invalid AI response structure:', parsedResponse);
            throw new Error('AI response does not contain valid bullet points.');
          }
      
          // Update the editor value
          setValue(bulletPoints);
          onEditorChange(bulletPoints);
      
          toast({
            title: 'Summary generated successfully!',
            description: 'Your AI-generated summary is ready to be edited.',
          });
        } catch (error) {
          console.error('Error generating summary:', error);
      
          // Show detailed error message
          toast({
            title: 'Error generating summary',
            description:`Something went wrong. Please try again.`,
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      };
      


    return (
        <div>
            <div className="flex items-center justify-between my-2">
                <Label>Work Summary</Label>
                <Button
                    variant="outline"
                    type="button"
                    className="gap-1"
                    onClick={generateSummaryFromAI}
                >
                    <>
                        <Sparkles size="15px" className="text-primary-500" />
                        Generate with AI
                    </>
                    {loading && <Loader2 size="13px" className="animate-spin" />}
                </Button>
            </div>

            <EditorProvider>
                <Editor
                    value={value}
                    containerProps={{
                        style: {
                            resize: 'vertical',
                            lineHeight: 1.2,
                            fontSize: '13.5px',
                        },
                    }}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onEditorChange(e.target.value);
                    }}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
};

export default RichTextEditor;
