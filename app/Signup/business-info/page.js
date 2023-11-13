"use client";
import AuthHeader from "@/components/Auth/AuthHeader";
import React, { useEffect, useState } from "react";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

const Page = () => {
	const [business, setBusiness] = useState("");
	const [name, setName] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [operate, setOperate] = useState("");
	const router = useRouter();

	const handleBusinessChange = (event) => {
		setBusiness(event.target.value);
	};

	const handleOperateChange = (event) => {
		setOperate(event.target.value);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleClick = () => {
		console.log("Clicked");
		router.push("/signup/pricing");
	};

	useEffect(() => {
		if (name === "" || business === "" || operate === "") {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [name, business, operate]);

	return (
		<div>
			<AuthHeader disabled={disabled} handleClick={handleClick} />
			<div className='flex flex-col space-y-[3em] md:w-[500px] mx-auto mt-[2.5em] px-[1em]'>
				<h1 className='text-center tracking-[-0.96px] sodo600'>
					Tell us about your business
				</h1>
				<div className='flex flex-col space-y-[2.5em]'>
					<Input text='Enter your business name' onChange={handleNameChange} />

					<div className='flex flex-col space-y-[1em] '>
						<FormControl fullWidth>
							<Select
								value={business}
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								onChange={handleBusinessChange}
								sx={{
									"& .MuiSelect-select": {
										color: "#5F6370",
                                        letterSpacing:"-0.26px",
                                        fontSize:"14px",
                                        fontFamily:"SodoSans-reg"
									},
								}}
							>
								<MenuItem
									className='text-black  sudo400  text-[0.9em] tracking-[-0.56px]'
									value=''
									disabled
								>
									What kind of business do you run?
								</MenuItem>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value='Restaurant'
								>
									Restaurant
								</MenuItem>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value='Hotel'
								>
									Hotel
								</MenuItem>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value='Food Truck'
								>
									Food Truck
								</MenuItem>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value='Cafe & Bakery'
								>
									Cafe & Bakery
								</MenuItem>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value='Bar & NightClub'
								>
									Bar & NightClub
								</MenuItem>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value='Others'
								>
									Others
								</MenuItem>
							</Select>
						</FormControl>

						<FormControl fullWidth>
							<Select
								value={operate}
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}								
								onChange={handleOperateChange}                                
								sx={{                                   
									"& .MuiSelect-select": {
										color: "#5F6370",
                                        letterSpacing:"-0.26px",
                                        fontSize:"14px",
                                        fontFamily:"SodoSans-reg"
									},
								}}
							>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value=''
									disabled
								>
									How do you operate your business?
								</MenuItem>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value='Physiceal Location'
								>
									Physical Location
								</MenuItem>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value='Online Store'
								>
									Online Store
								</MenuItem>
								<MenuItem
									className='text-black  sudo400 text-[0.9em] tracking-[-0.56px]'
									value='Physice and Online'
								>
									Physical and Online
								</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
