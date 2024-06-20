import RadioCheck from "@/components/RadioCheck";
import CustomLabel from "@/components/label/CustomLabel";
import React, { useEffect, useState } from "react";

const AutomaticWithdraw = ({getAutomaitcIntervalValue}) => {
	const [itemSelected, setItemSelected] = useState("");
    useEffect(()=>{
        getAutomaitcIntervalValue(itemSelected)
    },[itemSelected])
	return (
		<CustomLabel header='Select payout interval '>
			{["Daily", "Every 3 Days", "Weekly", "Monthly"].map((data, i) => (
				<div
					className='flex items-center space-x-[0.75rem]'
					key={i}
					onClick={() => {
						setItemSelected(data);
					}}
				>
					<RadioCheck isChecked={itemSelected === data} />

					<h2
						className={`text-[13px]   sodo400 tracking-[-0.52px]`}
					>
						{data}
					</h2>
				</div>
			))}
		</CustomLabel>
	);
};

export default AutomaticWithdraw;
