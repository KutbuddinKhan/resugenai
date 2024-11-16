import React from 'react'
import TopSection from './common/TopSection'
import ResumeForm from './ResumeForm'
import ResumePreview from './ResumePreview'

const EditResume = () => {
  return (
    <div className='relative w-full min-h-screen bg-gray-100 dark:bg-gray-800'>
      <div className='w-full mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8'>
        <TopSection />

        <div className='w-full mt-4 sm:mt-6'>
          <div className='flex flex-col lg:flex-row items-start w-full py-3 gap-6'>
            {/* Form section */}
            <div className='w-full lg:w-1/2 bg-white rounded-lg shadow-md p-4 sm:p-6'>
              <ResumeForm />
            </div>
            
            {/* Preview section */}
            <div className='w-full lg:w-1/2 bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6 lg:mt-0'>
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditResume