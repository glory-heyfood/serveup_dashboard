import React from 'react'

const LabelText = ({label, fontWeight}) => {
  return (
    <h1 className={`text-[13px] tracking-[-0.52px] ${fontWeight ? fontWeight :"sodo700"}  `}>{label}</h1>
  )
}

export default LabelText