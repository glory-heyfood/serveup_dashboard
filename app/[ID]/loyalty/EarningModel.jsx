import LabelInput from "@/components/label/LabelInput";
import Modal from "@/components/Modal";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import React, { useState } from "react";
import EarningModalItems from "./EarningModalItems";

const Label = ({ label }) => {
	return <h1 className='text-[13px] sodo700 tracking-[-0.52px]  '>{label}</h1>;
};

const EarningModel = () => {
	const [selectedValue, setSelectedValue] = useState("");
	const [Discsel, setDiscSel] = useState("Amount");
	const handleSelectChange = (e) => {
		setSelectedValue(e.target.value);
	};
	const [itemSelected, setItemSelected] = useState(null);
	return (
		<Modal header='Add new earning rule' minHeight='' >
			<div className='flex flex-col space-y-[16px]'>
				<EarningModalItems
					header='Order based'
					subHeader='Reward a customer everytime they place a order'
					index={1}
					itemSelected={itemSelected}
					setItemSelected={setItemSelected}
				/>

				<EarningModalItems
					header='Amount spent'
					subHeader='Reward a customer on amount spent on orders'
					index={2}
					itemSelected={itemSelected}
					setItemSelected={setItemSelected}
				>
					<LabelSearchInput
						width='md:w-[34%]'
                        inputFont="sodo400"
						label={<Label label={`Everytime customers spend`} />}
						icon={<Label label="₦" />}
					/>
				</EarningModalItems>

				<EarningModalItems
					header='Item based'
					subHeader='Reward a customer for purchasing a specific item'
					index={3}
					itemSelected={itemSelected}
					setItemSelected={setItemSelected}                    
				>
					<LabelInput label={<Label label="Item" />} padding="13px 0px 16px 16px" width="md:w-[34%]" >
                    <h1 className="text-[#072A85] text-[13px] tracking-[-0.56px] sodo600 ">Select Items</h1>
                    </LabelInput>
				</EarningModalItems>
			</div>
		</Modal>
	);
};

export default EarningModel;
