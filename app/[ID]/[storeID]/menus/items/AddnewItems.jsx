import { plusIconBlack } from "@/SVGs";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import UploadImage from "@/components/UploadImage";
import DashBtn from "@/components/buttons/DashBtn";
import SaveDiscardBtn from "@/components/buttons/Save&DiscardBtn";
import CustomLabel from "@/components/label/CustomLabel";
import LabelInput from "@/components/label/LabelInput";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import LabelSelect from "@/components/label/LabelSelect";
import LabelText from "@/components/label/LabelText";
import LabelTextarea from "@/components/label/LabelTextarea";
import { options } from "@/data";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuModal from "../MenuModal";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const AddnewItems = ({ handleClose }) => {
    const showModal = useSelector((state)=> state.modal.showModal)
    const dispatch = useDispatch()
	return (
		<ComponentModalLayout handleClose={handleClose}>
			<div className='w-full px-[20px] pb-[32px]'>
				<h1 className='dashHeader !mb-[32px] ml-[44px] md:ml-0'>
					Create new Item
				</h1>
				<div className='flex flex-col space-y-[2em]'>
					<CustomLabel header='Item details'>
						<div className='flex flex-col md:flex-row md:space-x-[1rem] space-y-[2rem] md:space-y-0'>
							<div className="w-full md:w-fit">
                            <UploadImage />
                            </div>
							<div className='w-full flex flex-col space-y-[1rem]'>
								<LabelSearchInput
									label='Item name'
                                    width="w-[35%]"
									fontweight='sodo700'
									placeholder='Item name'
								/>
								<LabelTextarea
									label='Description'
                                    width="w-[35%]"
									placeholder='Item description'
								/>
							</div>
						</div>

						<LabelSelect
							label='Category'
							defaultValue='Select catgory'
							option={options}
							selectedValue=''
							fullWidth
						/>

						<LabelInput
							padding='13px 15px'
							label={<LabelText fontWeight='sodo700' label='Price' />}
						>
							<span className='inter600 text-black text-[0.825rem] tracking-[-0.56px] '>
								₦{" "}
							</span>
							<input className='sodo700 border-none outline-none text-[0.825rem] tracking-[-0.56px]  ' />
						</LabelInput>
					</CustomLabel>

					<CustomLabel header='Modifiers'>
						<div className='w-fit'>
							<DashBtn
								text='Add modifiers'
                                handleClick={()=>{
                                    dispatch(toggleModal(true))
                                }}
								icon={plusIconBlack}
								lightTheme={true}
							/>
						</div>
					</CustomLabel>

					<div className='mb-[2.5rem]'>
						{[
							"Packaging",
							"Choice of protein",
							"Extra Portion",
							"Toppings",
							"Sides",
						].map((name, i) => (
							<div
								key={i}
								className='py-[1rem] items-center justify-between flex border-[0.5px] border-transparent border-b-[#E6E6E6] '
							>
								<h2 className='sodo400 text-[0.75rem] tracking-[-0.24px]  '>
									{name}
								</h2>
							</div>
						))}
					</div>

					<div className="w-fit">
                        <DashBtn text="Save" padding="11px 70px" />
                    </div>
				</div>
			</div>

        {
            showModal && (<MenuModal btn={false} header="Add modifiers" subHeader="Select modifier sets to apply to this item">
                <div className='mb-[2.5rem]'>
						{[
							"Packaging",
							"Choice of protein",
							"Extra Portion",
							"Toppings",
							"Sides",
						].map((name, i) => (
							<div
								key={i}
								className='py-[1rem] items-center space-x-[1rem] flex border-[0.5px] border-transparent border-b-[#E6E6E6] '
							>
                                <input type="checkbox" className="w-[16px] h-[16px]" />
								<h2 className='sodo400 text-[0.75rem] tracking-[-0.24px]  '>
									{name}
								</h2>
							</div>
						))}
					</div>
            </MenuModal>)
        }                            

		</ComponentModalLayout>
	);
};

export default AddnewItems;
