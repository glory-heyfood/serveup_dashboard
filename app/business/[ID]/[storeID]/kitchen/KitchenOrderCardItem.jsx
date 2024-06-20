import React from 'react'

const KitchenOrderCardItem = ({number, item}) => {
  return (
    <div className='flex space-x-[13px] items-center'>
        <h1 className='text-[0.75rem] tracking-[-0.48px] sodo700 '>{number}</h1>
        <h1 className='text-[0.75rem] tracking-[-0.48px] sodo400 '>{item}</h1>

    </div>
  )
}

export default KitchenOrderCardItem