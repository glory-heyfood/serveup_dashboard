import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import DateRangePickers from "./DateRangePicker";

const CustomDateRangePicker = ({ options, defaultValue }) => {
	const [selectedItem, setSelectedItem] = useState("");
	const [dateRange, setDateRange] = useState(null);

	const handleSelectChange = (event) => {
		const value = event.target.value;

		if (value === "custom") {
			// Handle custom item (e.g., show date range picker)
			// You can customize this part based on your requirements
			setDateRange({
				startDate: new Date(),
				endDate: new Date(),
			});
		} else {
			// Handle other items
			setDateRange(null);
		}

		setSelectedItem(value);
	};

	const handleDateRangeChange = (range) => {
		setDateRange(range);
	};

	return (
		<div>
			<CustomSelect
				options={options}
				handleChange={handleSelectChange}
				defaultValue={defaultValue}
				selectedValue={selectedItem}
			/>

			{selectedItem === "custom" && dateRange && (
				// <DateRangePicker
				// 	value={dateRange}
				// 	onChange={handleDateRangeChange}
				// 	minDate={dateRange.minDate}
				// 	maxDate={dateRange.maxDate}
				// />
				<DateRangePickers open={true} />
			)}
		</div>
	);
};

export default CustomDateRangePicker;
