import LabelInput from '@/components/label/LabelInput'
import LabelSearchInput from '@/components/label/LabelSearchInput'
import LabelSelect from '@/components/label/LabelSelect'
import Modal from '@/components/modal/Modal'
import { options } from '@/data'
import React from 'react'

const AddEmployee = () => {
  return (
    <Modal header="Add new employee" maxWidth="max-w-[850px]" >

        <div className='flex flex-col space-y-[32px]'>
            <div className='flex items-center flex-col md:flex-row space-y-[32px] md:space-y-0 w-full space-x-0 md:space-x-[16px]  '>
            <div className=' w-full md:w-[50%]'><LabelSearchInput fontweight="sodo700"  label="First name" placeholder="First name"  /></div>
            <div className='w-full md:w-[50%]'><LabelSearchInput fontweight="sodo700" label="Last name" placeholder="Last name" /></div>
            </div>
            <LabelSearchInput fontweight="sodo700" label="Phone number" placeholder="Phone number" />
            <LabelSearchInput fontweight="sodo700" label="Email address" placeholder="Email address" />
            <LabelSelect label='Location(s)'  option={options} defaultValue="Select Locations" selectedValue="" />
            <LabelSelect label='Role'  option={options} defaultValue="Select role" selectedValue="" />
            
        </div>



    </Modal>
  )
}

export default AddEmployee