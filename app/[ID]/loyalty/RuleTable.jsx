import CustomLabel from "@/components/label/CustomLabel";
import React from "react";
import SettingRow from "./SettingRow";

import { plusIconBlue } from "@/SVGs";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import EarningModel from "./EarningModel";

const RuleTable = () => {
	const dispatch = useDispatch();
	const modal = useSelector((state) => state.modal.showEarnModal);

	const handleClick = () => {
		console.log("hey");
	};

	const handleExpiryClick = () => {
		console.log("hey");
	};

	const Label = ({ label }) => {
		return <h1 className='text-[13px] sodo700 tracking-[-0.52px'> {label} </h1>;
	};

	const option = [
		{
			value: "1 point",
			description: "Earn 1 Point for every N1000 spent",
			eligible: "All items and categories",
			expiry: "1 month",
		},
		{
			value: "1 point",
			description: "Earn 1 Point for every N1000 spent",
			eligible: "All items and categories",
			expiry: "1 month",
		},
	];

	return (
	<div>
        	<CustomLabel header='Earning Points'>
			<div>
				<SettingRow
					bold={true}
					col1='Rule Value'
					col2='Expiry'
					col3='Eligible Items'
				/>

				{option.map((data, i) => (
					<div key={i} className=''>
						<SettingRow
							col1={data.value}
							col2={data.expiry}
							col3={data.eligible}
							col4='Edit'
							handleClick={handleClick}
						/>
					</div>
				))}

				<div
					className='flex mt-[12px] cursor-pointer'
					onClick={() => {
						dispatch(
							toggleModal({
								modal: "earn",
								payload: true,
							}),
						);
					}}
				>
					<span> {plusIconBlue} </span>
					<h3 className='text-[#072A85] text-[12px] sodo700 tracking-[-0.24px]'>
						{" "}
						Add earning rule{" "}
					</h3>
				</div>
			</div>
		</CustomLabel>
			{modal && <EarningModel />}
    </div>
	);
};

export default RuleTable;
