import React from 'react'
import AddResume from '../_components/AddResume'
import ResumeList from '../_components/ResumeList'
import TrashListBox from '../_components/TrashListBox'

const Page = () => {
  return (
    <div className='w-full'>
      <div className='w-full mx-auto max-w-7xl py-5 px-5 md:px-0'>
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>ResuGenie.ai</h1>
            <p className='text-base dark:text-inherit'>Craft a Professional Resume in Minutes with AI</p>
          </div>
        </div>

        <div className='shrink-0 flex items-center gap-3'>
        {/* Ṭrash List */}
          <TrashListBox />
        </div>

        <div className='w-full pt-11'>
          <h5 className='text-xl font-semibold dark:text-inherit mb-3'>All Resumes</h5>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            <AddResume />
            <ResumeList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page