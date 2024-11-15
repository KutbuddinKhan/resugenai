import EditResume from '../../../../_components/EditResume'
import { ResumeInfoProvider } from '@/context/resume-info-provider'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <ResumeInfoProvider>
      <EditResume />
    </ResumeInfoProvider>
  )
}

export default Page