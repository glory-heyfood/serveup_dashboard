import React from "react";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import dayjs from "dayjs";

const Clock = ({handleTimeChange}) => {
	return (
		<div>
			<MobileTimePicker          
            onAccept={(e)=>{
                // handleTimeChange(e)
                console.log("accepted");
                console.log(e.$H, e)

            }}
				sx={{
					"& .MuiInputBase-root": {
						outline: "none",
						border: "none",
					},
					".MuiOutlinedInput-notchedOutline": {
						border: "none",
					},
					"&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
						{
							border: "none",
						},
					"& .MuiInputBase-input": {
						padding: "0px",
                        border:"none",
						cursor: "pointer",
						fontSize: "0.81em",
						fontFamily: "SodoSans-SemiBold",
						letterSpacing: "-0.52px",
						color: "#072A85",
					},
				}}
				defaultValue={dayjs("2022-04-17T15:30")}
			/>
		</div>
	);
};

export default Clock;
