import CustomLabel from "@/components/label/CustomLabel";
import React from "react";
import SettingRow from "./SettingRow";
import { menuDotsBlue, plusIconBlue } from "@/SVGs";
import SettingRowReward from "./SettingRowReward";
import { useDispatch, useSelector } from "react-redux";
import RewardModal from "./RewardModal";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const RewardTable = () => {
	const dispatch = useDispatch();
	const modal = useSelector((state) => state.modal.showModal);

	const handleBtnClick = () => {
		console.log("Btn click");
	};

	const option = [
		{
			value: "10 Points",
			description: "10% off your order",
		},
		{
			value: "20 Points",
			description: "20% off your order",
		},
		{
			value: "30 Points",
			description: "30% off your order",
		},
		{
			value: "40 Points",
			description: "free delivery",
		},
	];
	return (
		<div>
			<CustomLabel header='Redeeming Rewards'>
				<div>
					<SettingRowReward
						col1='Reward Value'
						col2='Reward Description'
						bold={true}
					/>
					<div>
						{option.map((data, i) => (
							<SettingRowReward
								key={i}
								col1={data.value}
								col2={data.description}
								col3={menuDotsBlue}
							/>
						))}
					</div>
					<div className='flex mt-[12px] cursor-pointer w-fit'
                    onClick={()=>{
                        dispatch(toggleModal(true))
                    }}
                    >
						<span> {plusIconBlue} </span>
						<h3
							onClick={handleBtnClick}
							className='text-[#072A85] text-[12px] sodo700 tracking-[-0.24px]'
						>
							{" "}
							Add a new reward
						</h3>
					</div>
				</div>
			</CustomLabel>

			{modal && <RewardModal />}
		</div>
	);
};

export default RewardTable;
