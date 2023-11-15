import { TextField } from '@mui/material'
import React from 'react'

const CampaignItemInput = ({placeholder, handleChange}) => {
  return (
    <div>
        <TextField
					type ='text'
                    fullWidth
                    placeholder={placeholder}
                    onChange={(e)=>handleChange(e)}
					sx={{
						color: "#A9ADB5",
						border: "1px solid #E6E6E6",
                        borderRadius:"4px",
						padding: "15px 0px 16px 16px",
						letterSpacing: "-0.52px",
						fontSize: "13px",
						fontFamily: "SodoSans-light",
                        width:"100%",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "transparent",
                                padding: "0px 0px",
                            },
                            "&:hover fieldset": {
                                borderColor: "transparent",
                            },
                            "&.Mui-focused  fieldset": {
                                borderColor: "transparent",
                            },
                            "& .MuiOutlinedInput-input": {
                                padding: "0px",
                                fontSize: "0.75em",
                                letterSpacing: "-0.24px",
                                color: "#000",
                                fontFamily: "sodoSans-reg",
                            },
                        },
					}}
				/>
    </div>
  )
}

export default CampaignItemInput