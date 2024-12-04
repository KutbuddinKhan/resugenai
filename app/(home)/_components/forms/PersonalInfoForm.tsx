import PersonalInfoSkeletonLoader from '@/components/skeleton-loader/personal-info-loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResumeContext } from '@/context/resume-info-provider'
import useUpdateDocument from '@/features/document/use-update-documents'
import { toast } from '@/hooks/use-toast'
import { generateThumbnail } from '@/lib/helper'
import { PersonalInfoType } from '@/types/resume.type'
import { Loader2 } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

const initialState = {
    id: undefined,
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    linkedIn: "",
    portfolio: ""
}

const PersonalInfoForm = (props: { handleNext: () => void }) => {
    const { handleNext } = props
    const { resumeInfo, isLoading, onUpdate } = useResumeContext()

    const { mutateAsync, isPending } = useUpdateDocument()


    const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>(initialState)

    useEffect(() => {
        if (!resumeInfo) {
            return
        }
        if (resumeInfo?.personalInfo) {
            setPersonalInfo({
                ...(resumeInfo?.personalInfo || initialState)
            })
        }
    }, [resumeInfo?.personalInfo])

    const handleChange = useCallback(
        (e: { target: { name: string; value: string } }) => {
            const { name, value } = e.target

            setPersonalInfo({ ...personalInfo, [name]: value })

            if (!resumeInfo) return

            onUpdate({
                ...resumeInfo,
                personalInfo: {
                    ...resumeInfo.personalInfo,
                    [name]: value
                },
            });
        },
        [resumeInfo, onUpdate]
    )

    const handleSubmit = useCallback(
        async (e: { preventDefault: () => void }) => {
            e.preventDefault()

            const thumbnail = await generateThumbnail()

            const currentNo = resumeInfo?.currentPosition ? resumeInfo?.currentPosition + 1 : 1;

            await mutateAsync(
                {
                    currentPosition: currentNo,
                    thumbnail: thumbnail,
                    personalInfo: personalInfo,
                },
                {
                    onSuccess: () => {
                        toast({
                            title: 'Success',
                            description: "PersonaliInfo updated successfully",
                        });
                        handleNext();
                    },
                    onError: () => {
                        toast({
                            title: 'Error',
                            description: 'Failed to update personal information',
                            variant: 'destructive',
                        });
                    },
                }
            )

        },
        [resumeInfo, personalInfo]
    )

    if (isLoading) {
        return <PersonalInfoSkeletonLoader />
    }

    return (
        <div>
            <div className='w-full'>
                <h2 className='font-bold text-lg'>
                    Personal Information
                </h2>
                <p className='text-sm'>
                    Please fill in your personal information
                </p>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 mt-5 gap-3'>
                        <div>
                            <Label className='text-sm'>First Name</Label>
                            <Input
                                name="firstName"
                                required
                                autoComplete='off'
                                placeholder=''
                                value={personalInfo?.firstName || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className='text-sm'>Last Name</Label>
                            <Input
                                name="lastName"
                                required
                                autoComplete='off'
                                placeholder=''
                                value={personalInfo?.lastName || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className='text-sm'>Job Title</Label>
                            <Input
                                name="jobTitle"
                                required
                                autoComplete='off'
                                placeholder=''
                                value={personalInfo?.jobTitle || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className='text-sm'>Address</Label>
                            <Input
                                name="address"
                                required
                                autoComplete='off'
                                placeholder=''
                                value={personalInfo?.address || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className='text-sm'>Phone Number</Label>
                            <Input
                                name="phone"
                                required
                                autoComplete='off'
                                placeholder=''
                                value={personalInfo?.phone || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label className='text-sm'>Email</Label>
                            <Input
                                name="email"
                                required
                                autoComplete='off'
                                placeholder=''
                                value={personalInfo?.email || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-4'>
                            <Label className="block text-sm font-medium mb-1">LinkedIn</Label>
                            <Input
                                name="linkedin"
                                type="url"
                                required
                                autoComplete="off"
                                placeholder=""
                                value={personalInfo?.linkedin || ""}
                                onChange={handleChange}
                            />
                            <span className="text-xs text-gray-500 mt-1">
                                Enter your LinkedIn URL
                            </span>
                        </div>
                        <div className="mb-4">
                            <Label className="block text-sm font-medium mb-1">Portfolio</Label>
                            <Input
                                name="portfolio"
                                type="url"
                                required
                                autoComplete="off"
                                placeholder=""
                                value={personalInfo?.portfolio || ""}
                                onChange={handleChange}
                            />
                            <span className="text-xs text-gray-500 mt-1">
                                Enter your Portfolio or GitHub URL
                            </span>
                        </div>
                    </div>

                    <Button
                        className='mt-4'
                        type="submit"
                        disabled={
                            isPending || resumeInfo?.status === "archived" ? true : false
                        }
                    >
                    {isPending && <Loader2 size="16px" className='animate-spin' /> }
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default PersonalInfoForm