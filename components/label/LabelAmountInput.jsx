import React from "react";
import LabelInput from "./LabelInput";
import LabelText from "./LabelText";

const LabelAmountInput = ({
	label,
	rounded,
	labelWidth,
	value,
	name,
	handleChange,
}) => {
	return (
		<LabelInput
			width={labelWidth}
			label={<LabelText label={label} fontWeight='sodo700' />}
			padding='15px 16px'
			rounded={rounded}
		>
			<span className='inter600 text-[0.825rem]'>₦</span>
			<input
				className='border-none outline-none text-black sodo700 text-[0.825rem] tracking-[-0.56px] '
				name={name}
				value={value && value}
				onChange={(e) => {
					handleChange(e);
				}}
			/>
		</LabelInput>
	);
};

export default LabelAmountInput;
