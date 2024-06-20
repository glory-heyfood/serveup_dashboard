import React from 'react'

const CustomeSideText = ({header, text, space}) => {
  return (
    <div className={`space-y-[${space}]`}>
        <h3 className='text-[#000] text-[0.75em] tracking-[-0.24px] sodo700  '> {header} </h3>
        <h3 className='text-[#5F6370] text-[0.75em] tracking-[-0.24px] sodo400 '> {text} </h3>
    </div>
  )
}

export default CustomeSideText