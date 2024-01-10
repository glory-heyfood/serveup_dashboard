// import * as React from "react";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

// export default function DateRangePickers({ open }) {
// 	return (
// 		<LocalizationProvider dateAdapter={AdapterDayjs}>
// 			<DateRangeCalendar calendars={1}  />
// 		</LocalizationProvider>
// 	);
// }

import { DateRangePicker } from "rsuite";
import 'rsuite/dist/rsuite-no-reset.min.css';


export const DateRange = () => (
	<>
				
		<DateRangePicker
			appearance='subtle'            
			placeholder='Select date range'
			style={{ width: 230 }}
		/>
	</>
);
