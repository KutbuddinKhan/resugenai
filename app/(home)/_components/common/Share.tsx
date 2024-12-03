import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useResumeContext } from '@/context/resume-info-provider'
import useUpdateDocument from '@/features/document/use-update-documents'
import useOrigin from '@/hooks/use-origin'
import { toast } from '@/hooks/use-toast'
import { StatusType } from '@/types/resume.type'
import { Check, ChevronDown, Copy, Globe, Loader2, Share2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'

const Share = () => {
  const param = useParams()

  const documentId = param.documentId || ""

  const { resumeInfo, onUpdate, isLoading } = useResumeContext()
  const { mutateAsync, isPending } = useUpdateDocument()

  const origin = useOrigin()

  const [copied, setCopied] = useState(false)

  const url = `${origin}/preview/${documentId}/resume`;

  const onCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  const handleClick = useCallback(
    async (status: StatusType) => {
      if (!resumeInfo) return 

      await mutateAsync(
        {
          status: status,
        },
        {
          onSuccess: () => {
            onUpdate({
              ...resumeInfo,
              status: status,
            })
            toast({
              title: 'Status updated successfully',
              description: `Updated status to ${status} successfully`
            })
          },
          onError() {
            toast({
              title: 'Error updating status',
              description: 'Failed to update status',
              variant: 'destructive'
              })
          }
        }
      )
    },
    [mutateAsync, onUpdate, resumeInfo]
  )

  return (
    <Popover>
      <PopoverTrigger
        disabled={resumeInfo?.status === 'archived' ? true: false}
        asChild
        >
          <Button
            disabled={
              isLoading || resumeInfo?.status === "archived" ? true: false
            }
            variant="secondary"
            className='bg-white border gap-1 dark:bg-gray-600 !p-2 lg:w-auto lg:p-4'
          >
            <div className='flex items-center gap-1'>
              <Share2Icon size='17' />
              <span className='hidden lg:flex'>Share</span>
            </div>
            <ChevronDown size="14px" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className='bg-background'
          align='end'
          alignOffset={0}
          forceMount
        >
          {resumeInfo?.status === "public" ? (
            <div className='space-y-3'>
              <div className='flex gap-x-2 items-center'>
                <Globe size="15px" className='text-primary animate-pulse' />
                <p className='font-medium text-xs text-primary'>
                  This resume is shareable, copy the link!
                </p>
              </div>

              <div className='flex items-center'>
                <input 
                  className='flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate' 
                  value={url}
                />
                <Button 
                  className='h-8 rounded-l-none'
                  disabled={copied}
                  onClick={onCopy}
                >
                  {copied ? (
                    <Check size="w-4 h-4" />
                  ) : (
                    <Copy size="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <Separator className='border-muted !mb-0' />

              <Button
                size='sm'
                variant='outline'
                className='w-full border-primary text-primary text-xs font-semibold'
                onClick={() => handleClick("private")}
                disabled={isPending}
              >
                {isPending && <Loader2 size="15px" className='animate-spin' />}
                Make Private
              </Button>

            </div>
          ) : (
            <div className='w-full flex flex-col gap-2 items-center justify-center'>
              <Globe size='40px' />
              <div className='text-center mb-1'>
                <h5 className='font-semibold text-sm'>Set to Public</h5>
                <p className='text-xs text-muted-foreground'>
                  Share your resume with the world!
                </p>
              </div>

              <Button
                className='w-full h-8 !bg-primary text-xs dark:!bg-primary gap-1 font-semibold text-black'
                type='button'
                onClick={() => handleClick("public")}
                >
                  {isPending && <Loader2 size="15px" className='animate-spin' />}
                  Make Public
                </Button>
            </div>
          )}
        </PopoverContent>
    </Popover>
  )
}

export default Share