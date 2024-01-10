import { pauseIconRed, storeSettingStatusIcon } from '@/SVGs'
import React from 'react'

const Status = ({status}) => {
  return (
    <div className={`${status === "open" ? "border-[#FFD6BF]" : status === "closed" ? "border-[#FFD6BF]" : "border-[#FFD1D1]" } flex items-center rounded-[4px] py-[0.75rem] px-[1rem] space-x-[0.5rem] w-fit `}
    style={{
        backgroundColor:`${status === "open" ? "#F1F5FF" : status === "closed" ? 'rgba(245, 100, 18, 0.10)' : 'rgba(240, 28, 28, 0.10)' }`
    }}
    >
        <span>
        {status === "open" ? storeSettingStatusIcon("#072A85") : status === "closed" ? storeSettingStatusIcon("#F56412") : pauseIconRed }
        </span> 

        <h2 className={`${status === "open" ? "text-[#072A85]" : status === "closed" ? "text-[#F56412]" : "text-[#F01C1C]"} text-[0.75rem] sodo700 tracking-[-0.48px] capitalize  `}> Your store is currently {status} </h2> 
    </div>
  )
}

export default Status