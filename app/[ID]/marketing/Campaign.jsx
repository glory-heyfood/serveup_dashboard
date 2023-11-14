import CustomSearch from '@/components/CustomSearch'
import DashBtn from '@/components/Dashboard/DashBtn'
import React from 'react'
import StickyHeadTable from './Table'

const Campaign = () => {
  return (
    <div>
        <div className='flex items-center justify-between mb-[32px]'> 
            <CustomSearch placeholder="Search" />
            <DashBtn placeholder="Create new campaign" />
        </div>

        <StickyHeadTable />
    </div>
  )
}

export default Campaign