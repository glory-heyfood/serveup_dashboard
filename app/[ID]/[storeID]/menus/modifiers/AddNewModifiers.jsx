import { XIconRed, plusIconBlack, plusIconBlue } from "@/SVGs";
import ComponentModalLayout from "@/components/ComponentModalLayout";
import DashBtn from "@/components/buttons/DashBtn";
import CustomLabel from "@/components/label/CustomLabel";
import LabelSearchInput from "@/components/label/LabelSearchInput";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RadioDiscountPicker from "@/components/discount/RadioDiscountPicker";
import SwitchPicker from "@/components/SwitchPicker";
import InStock from "@/components/InStock";
import {
	createModifier,
	updateModifier,
} from "@/redux/features/stores/menuSlice";
import { data } from "autoprefixer";
import OptionInStock from "@/components/OptionInStock";
import { Switch } from "@mui/material";
import { generateId } from "@/utils";

const AddNewModifiers = ({ handleClose, editData }) => {
	const showModal = useSelector((state) => state.modal.showModal);
	const [modifierSelected, setModifierSelected] = useState("");
	const [customerChoiceSelected, setCustomerChoiceSelected] = useState();
	const [selectionLimitChecked, setSelectionLimitChecked] = useState(false);
	const [selectedData, setSelectedData] = useState();
	const [clearSelectedData, setClearSelectedData] = useState(false);
	const btnLoading = useSelector((state) => state.menu.loading);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: editData ? editData.name : "",
		selection_limit: editData ? editData.selection_limit : null,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const [options, setOptions] = useState([
		{
			id:"",
			option_name: "",
			price: "",
			in_stock: {
				status: true,
				reference_date: "",
				message: "In stock",
			},
			multiple_selection: false,
		},
	]);

	const handleAddOption = () => {
		setOptions((prevOptions) => [
			...prevOptions,
			{
				id: generateId(),
				option_name: "",
				price: "",
				in_stock: {
					status: true,
					reference_date: "",
					message: "In stock",
				},
				multiple_selection: false,
			},
		]);
	};

	const handleRemoveOption = (index) => {
		setOptions((prevOptions) => {
			const newOptions = [...prevOptions];
			newOptions.splice(index, 1); // Remove the option at the specified index
			return newOptions;
		});
	};

	const handleOptionChange = (index, field, value) => {
		setOptions((prevOptions) =>
			prevOptions.map((option, i) =>
				i === index ? { ...option, [field]: value } : option,
			),
		);

		console.log(options);
	};

	const handleCreateModifier = () => {
		const menu_id = JSON.parse(
			window.localStorage.getItem("serveup_store"),
		)?.menu_id;
		const payload = {
			name: formData.name,
			status: modifierSelected,
			choice: customerChoiceSelected,
			selection_limit: formData.selection_limit,
			options: options,
			menu_id: menu_id,
		};
		// console.log(payload);
		dispatch(createModifier(payload));
	};

	const handleEditModifier = () => {
		const menu_id = JSON.parse(
			window.localStorage.getItem("serveup_store"),
		)?.menu_id;
		const payload = {
			id: editData.id,
			name: formData.name,
			status: modifierSelected,
			choice: customerChoiceSelected,
			selection_limit: formData.selection_limit,
			options: options,
			menu_id: menu_id,
		};
		dispatch(updateModifier(payload));
	};

	const handleOutOfStock = (obj, data) => {
		setOptions((prevOptions) => {
			return prevOptions.map((option) => {
				if (option.option_name === data?.option_name) {
					return {
						...option,
						in_stock: obj,
					};
				}
				return option;
			});
		});
	};

	const handleSwitchChange = (check, name) => {
		setOptions((prevData) => {
			return prevData.map((option) => {
				if (option.option_name === name) {
					return {
						...option,
						multiple_selection: check,
					};
				}
				return option;
			});
		});
	};

	useEffect(() => {
		if (editData) {
			console.log(editData);
			setModifierSelected(editData.status);
			setOptions(editData.options);
			setFormData({
				name: editData.name,
				selection_limit: editData.selection_limit,
			}),
				setCustomerChoiceSelected(editData.choice);
			editData.choice === "Multiple Choice" && setSelectionLimitChecked(true);
		}
	}, [editData]);

	useEffect(() => {
		setSelectedData();
	}, [clearSelectedData]);

	return (
		<ComponentModalLayout handleClose={handleClose}>
			<div className='w-full px-[20px] pb-[32px] flex flex-col space-y-[2rem]'>
				<h1 className='dashHeader ml-[44px] md:ml-0'>
					{" "}
					{editData ? "Edit" : "Create new"} modifier
				</h1>

				<LabelSearchInput
					fontweight='sodo700'
					label='Modifier set name'
					value={formData.name}
					name='name'
					handleChange={handleChange}
					placeholder='Modifier set name - example: Protein, Extra Portion, Toppings'
				/>

				<CustomLabel header='is this modifier optional or required? '>
					<div className='py-[1.5rem] px-[1rem] border flex space-y-[1rem] flex-col border-[#E6E6E6] rounded-[0.5rem] '>
						<RadioDiscountPicker
							fontWeight='sodo700'
							header='Optional'
							itemSelected={modifierSelected}
							handleItemClick={(modifier) => {
								setModifierSelected(modifier);
							}}
						/>
						<RadioDiscountPicker
							fontWeight='sodo700'
							header='Required'
							itemSelected={modifierSelected}
							handleItemClick={(modifier) => {
								setModifierSelected(modifier);
							}}
						/>
					</div>
				</CustomLabel>

				<CustomLabel header='How many can customers select?'>
					<div className='py-[1.5rem] px-[1rem] border flex space-y-[1rem] flex-col border-[#E6E6E6] rounded-[0.5rem] '>
						<RadioDiscountPicker
							fontWeight='sodo700'
							header='Single Choice'
							subHeader='Customers can only select 1 option'
							itemSelected={customerChoiceSelected}
							handleItemClick={(selected) => {
								setCustomerChoiceSelected(selected);
								setFormData((prevFormData) => ({
									...prevFormData,
									selection_limit: 0,
								}));
							}}
						/>
						<RadioDiscountPicker
							fontWeight='sodo700'
							header='Multiple Choice'
							subHeader='Customers can select more than 1 option'
							itemSelected={customerChoiceSelected}
							handleItemClick={(selected) => {
								setCustomerChoiceSelected(selected);
							}}
						/>
					</div>
				</CustomLabel>

				{customerChoiceSelected === "Multiple Choice" && (
					<div className='border border-[#E6E6E6] rounded-[8px]'>
						<SwitchPicker
							border='border-none'
							checked={selectionLimitChecked}
							handleChange={(checked) => {
								console.log(checked);
								setSelectionLimitChecked(checked);
							}}
							header='Selection limit'
							text='How many can the customer add'
						/>
						{selectionLimitChecked && (
							<LabelSearchInput
								fontweight='sodo700'
								border='border border-t-[#E6E6E6] border-transparent '
								rounded='rounded-none'
								handleChange={handleChange}
								value={formData.selection_limit}
								label='Selection limit'
								name='selection_limit'
								placeholder='0'
							/>
						)}
					</div>
				)}

				<CustomLabel
					header='Options'
					subHeader='Add option items to this modifier . Example: Beef, Chicken, Plantain'
				>
					<div className='w-[120%] hidden md:block'>
						<table className='w-full'>
							<thead className='w-full'>
								<tr className='w-full py-[0.75rem] '>
									<th className='text-black  py-[0.75rem]  text-start  sodo600 tracking-[-0.24px] text-[0.75rem] '>
										Option Name
									</th>
									<th className='text-black  py-[0.75rem]  text-start  sodo600 tracking-[-0.24px] text-[0.75rem] '>
										{" "}
										Price{" "}
									</th>
									<th className='text-black  py-[0.75rem]  text-start  sodo600 tracking-[-0.24px] text-[0.75rem] '>
										{" "}
										Stock{" "}
									</th>
									<th className='text-black  py-[0.75rem]  text-start  sodo600 tracking-[-0.24px] text-[0.75rem] '>
										Allow multiple selection
									</th>
									<th> </th>{" "}
								</tr>
							</thead>

							{/* <tbody className='w-full'>
								<tr className='w-full  py-[0.75rem] border-[0.5px] border-transparent border-t-[#F0F0F0]'>
									<td className=' py-[0.75rem] '>
										<input
											className='border-none outline-none  placeholder:text-[#A9ADB5] text-[0.75rem] sodo300 tracking-[-0.24px] text-black'
											placeholder='Option Name'
										/>
									</td>
									<td className=' py-[0.75rem] '>
										<div className='flex items-center '>
											<h4 className='text-[#A9ADB5] text-[0.75rem] sodo300 tracking-[-0.24px]'>
												₦
											</h4>
											<input
												className='border-none outline-none  placeholder:text-[#A9ADB5] text-[0.75rem] sodo300 tracking-[-0.24px] text-black'
												placeholder='0'
											/>
										</div>
									</td>

									<td className='text-[#06AE68]] text-[0.75rem] sodo300 tracking-[-0.24px]  py-[0.75rem] '>
										In Stock
									</td>

									<td className=' py-[0.75rem] '>{XIconRed}</td>
								</tr>
							</tbody> */}
							<tbody className='w-full'>
								{options.map((option, index) => (
									<tr
										key={index}
										className='w-full py-[0.75rem] border-[0.5px] border-transparent border-t-[#F0F0F0]'
									>
										{/* Name */}
										<td className=' py-[0.75rem] '>
											<input
												className='border-none outline-none placeholder:text-[#A9ADB5] text-[0.75rem] sodo300 tracking-[-0.24px] text-black'
												placeholder='Option Name'
												value={option.option_name}
												onChange={(e) =>
													handleOptionChange(
														index,
														"option_name",
														e.target.value,
													)
												}
											/>
										</td>

										{/* Price */}
										<td className=' py-[0.75rem] '>
											<div className='flex items-center '>
												<h4 className='text-[#A9ADB5] text-[0.75rem] sodo300 tracking-[-0.24px]'>
													₦
												</h4>
												<input
													className='border-none outline-none placeholder:text-[#A9ADB5] text-[0.75rem] sodo300 tracking-[-0.24px] text-black'
													placeholder='0'
													value={option.price}
													onChange={(e) =>
														handleOptionChange(index, "price", e.target.value)
													}
												/>
											</div>
										</td>

										{/* Stock */}
										<td
											className='text-[#06AE68] text-[0.75rem] sodo300 tracking-[-0.24px] py-[0.75rem] '
											onClick={() => {
												setSelectedData((prevSelectedData) => {
													if (prevSelectedData) {
														return prevSelectedData;
													}
													let dataSelected = options.find(
														(data) => data.option_name === option.option_name,
													);

													let index = options.findIndex(
														(data) => data.option_name === option.option_name,
													);

													return dataSelected;
												});
											}}
										>
											{/* {option.stock} */}
											<OptionInStock
												clearSelectedData={clearSelectedData}
												setClearSelectedData={setClearSelectedData}
												setSelectedData={setSelectedData}
												data={options}
												optionData={option}
												handleOutOfStock={handleOutOfStock}
												selectedData={selectedData}
											/>
										</td>

										<td>
											<Switch
												checked={option.multiple_selection}                                                
												onChange={(e) => {
													handleSwitchChange(
														e.target.checked,
														option.option_name,
													);
												}}
											/>
										</td>

										{/* Delete Option */}
										<td className='py-[0.75rem]'>
											<button
												onClick={() => handleRemoveOption(index)}
												className='text-red-500 hover:text-red-700'
											>
												{XIconRed}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{/* <div className='space-x-[0.25rem] mt-[1rem] flex cursor-pointer'>
							{plusIconBlue}
							<h2 className='text-[#072A85] text-[0.75rem] sodo700 tracking-[-0.48px]'>
								Add option
							</h2>
						</div> */}
						<div
							className='space-x-[0.25rem] mt-[1rem] flex cursor-pointer'
							onClick={handleAddOption}
						>
							{plusIconBlue}
							<h2 className='text-[#072A85] text-[0.75rem] sodo700 tracking-[-0.48px]'>
								Add option
							</h2>
						</div>

						<div className='mt-[2.5rem] w-fit'>
							<DashBtn
								text='Save'
								padding='11px 70px'
								handleClick={
									editData ? handleEditModifier : handleCreateModifier
								}
								btnLoading={btnLoading}
							/>
						</div>
					</div>

					{/* Mobile */}
					<div></div>
				</CustomLabel>
			</div>
		</ComponentModalLayout>
	);
};

export default AddNewModifiers;
