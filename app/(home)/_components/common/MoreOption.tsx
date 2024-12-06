import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useResumeContext } from '@/context/resume-info-provider'
import useUpdateDocument from '@/features/document/use-update-documents'
import { toast } from '@/hooks/use-toast'
import { StatusType } from '@/types/resume.type'
import { Loader2, MoreHorizontal, Redo2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

const MoreOption = () => {
  const router = useRouter()
  const { resumeInfo, onUpdate } = useResumeContext()

  const { mutateAsync, isPending } = useUpdateDocument()

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
            router.replace(`/dashboard/`);
            toast({
              title: 'Status updated successfully',
              description: "Moved to trash Successfully"
            })
          },
          onError() {
            toast({
              title: 'Error',
              description: 'Failed to update status',
              variant: "destructive"
            })
          }
        }
      )
    },
    [mutateAsync, router, onUpdate, resumeInfo]
  )

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='secondary'
            size='icon'
            className='bg-white border dark:bg-gray-600'
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            {resumeInfo?.status === 'archived' ? (
              <Button
                variant='ghost'
                className='gap-1 !py-2 !cursor-pointer'
                disabled={isPending}
                onClick={() => handleClick("private")}
              >
                <Redo2 size='15px' />
                Restore Resume
                {isPending && <Loader2 size='15px' className='animate-spin' />}
              </Button>
            ) : (
              <div
                role="button"
                className="flex items-center gap-2 py-2 px-3 cursor-pointer"
                onClick={() => handleClick('archived')}
                style={{ pointerEvents: isPending ? 'none' : 'auto' }}
              >
                <Trash2 size="15px" />
                <span>Move to Trash</span>
                {isPending && <Loader2 size="15px" className="animate-spin" />}
              </div>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default MoreOption