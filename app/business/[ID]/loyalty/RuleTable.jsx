import CustomLabel from "@/components/label/CustomLabel";
import React, { useState } from "react";
import SettingRow from "./SettingRow";
import { menuDotsBlue, plusIconBlue } from "@/SVGs";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";
import EarningModel from "./EarningModel";

const RuleTable = () => {
	const dispatch = useDispatch();
	const modal = useSelector((state) => state.modal.showEarnModal);
	const [edit, setEdit] = useState(null);

	const handleClick = () => {
		console.log("hey");
	};

	const handleExpiryClick = () => {
		console.log("hey");
	};

	const Label = ({ label }) => {
		return <h1 className='text-[13px] sodo700 tracking-[-0.52px'> {label} </h1>;
	};

	const handleEdit = (index, data) => {
		console.log("Ediit");
		dispatch(
			toggleModal({
				modal: "earn",
				payload: true,
			}),
		);
		setEdit(data);
	};

	const renderModal = () => {
		if (modal) {
			if (edit !== null) {
				console.log("edit called");
				return <EarningModel data={edit} />;
			} else {
				return <EarningModel />;
			}
		}
	};

	const option = [
		{
			customersEarn: "1 point",
			description: "Earn 1 Point for every N1000 spent",
			eligibleItems: "All items ",
			expiry: "1 month",
		},
		{
			customersEarn: "1 point",
			description: "Earn 1 Point for every N1000 spent",
			eligibleItems: "All items and categories",
			expiry: "1 month",
		},
	];

	return (
		<div>
			<CustomLabel header='Earning Points'>
				<div>
					<SettingRow
						bold={true}
						// col1='Rule Value'
						// col2='Descriptions'
						// col3='Expiry'
						// col4='Eligible Items'
						data={{
							customersEarn: "Rule Value",
							description: "Descriptions",
							expiry: "Expiry",
							eligibleItems: "Eligible Items",
						}}
					/>

					{option.map((data, i) => (
						<div key={i} className=''>
							<SettingRow
								index={i}
								data={data}
								col5={menuDotsBlue}
								handleEdit={handleEdit}
								handleClick={handleClick}
							/>
						</div>
					))}

					<div
						className='flex mt-[12px] cursor-pointer'
						onClick={() => {
                            setEdit(null)
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
			{renderModal()}
		</div>
	);
};

export default RuleTable;
