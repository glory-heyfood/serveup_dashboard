import React from 'react'

const InterTextComp = ({header, text}) => {
  return (
    <div>
        <h3 className='text-[#5F6370] sodo400 text-[0.75rem] tracking-[-0.24px] '>{header}</h3>
        <h1 className='inter600 text-black tracking-[-0.96px] text-[1.5rem] '>{text}</h1>
    </div>
  )
}

export default InterTextComp