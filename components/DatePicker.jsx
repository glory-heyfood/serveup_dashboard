import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function DatePicker({ color, handleDateChange }) {
	const day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}  >
			<DemoContainer components={["MobileDatePicker"]} >
				<DemoItem label=''>
					<MobileDatePicker
						onAccept={(e) => {
							// handleTimeChange(e)
							console.log("accepted");
							console.log(e.$M, e.$W, e.$y, e.$D);
                            handleDateChange(`${day[e.$W]},${months[e.$M]} ${e.$D} ${e.$y}`)
						}}
						sx={{
                            marginTop:"-8px !important",
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
								border: "none",
								cursor: "pointer",
								fontSize: "0.81em",
								fontFamily: "SodoSans-SemiBold",
								letterSpacing: "-0.52px",
								color: color ? color : "#072A85",
							},
						}}
						defaultValue={dayjs("2023-04-17")}
					/>
				</DemoItem>
			</DemoContainer>
		</LocalizationProvider>
	);
}
