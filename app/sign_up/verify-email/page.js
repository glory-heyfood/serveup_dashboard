"use client";
import AuthBtn from "@/components/Auth/AuthBtn";
import CountdownTimer from "@/components/CountdownTimer";
import {  resendEmailOTP, verifyEmailAsync } from "@/redux/features/business/businessSlice";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
	const [formData, setFormData] = useState({
		input1: "",
		input2: "",
		input3: "",
		input4: "",
		input5: "",
		input6: "",
	});
	const [disabled, setDisabled] = useState(true);
	const router = useRouter();
	const dispatch = useDispatch();
	const btnLoading = useSelector((state) => state.business.loading);
	const [data, setData] = useState("");
    const [textBtnDisabled, setTextBtnDisabled] = useState(true)

    console.log(btnLoading)

	const handleClick = () => {
		const payload = {
			email:data.email,
			otp: `${formData.input1}${formData.input2}${formData.input3}${formData.input4}${formData.input5}${formData.input6}`,
            phone_number:data.phone_number,            
            password: data.password
		};
		dispatch(verifyEmailAsync(payload))
			.unwrap()
			.then((res) => {
				console.log(res);
				if (res) {
					router.push("/sign_up/business-info");
				}
			});
	};

    const handleTextBtnClick = () => {        
        dispatch(resendEmailOTP({email:data.email}))
			.unwrap()
			.then((res) => {
				
			});
    }

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleTimeFinish = () => {
        setTextBtnDisabled(false)
    };

	useEffect(() => {
		const handlePaste = (event) => {
			const pastedValue = event.clipboardData.getData("text");

			for (let i = 0; i < pastedValue.length && i < 6; i++) {
				const inputIndex = i + 1;
				document.getElementById(`input${inputIndex}`).value = pastedValue[i];
				setFormData((prevFormData) => ({
					...prevFormData,
					[`input${inputIndex}`]: pastedValue[i],
				}));
			}

			event.preventDefault();
		};

		window.addEventListener("paste", handlePaste);

		return () => {
			window.removeEventListener("paste", handlePaste);
		};
	}, []);

	useEffect(() => {
		console.log(formData);
		const isAnyInputEmpty = Object.values(formData).some(
			(value) => value.trim() === "",
		);
		console.log(isAnyInputEmpty);
		setDisabled(isAnyInputEmpty);
	}, [formData]);

	useEffect(() => {        
        const data = JSON.parse(window.localStorage.getItem("serveup_user"))
		setData(data);
	}, []);

	return (
		<div className='flex'>
			<div
				className='w-[50%] lg:w-[60%] h-screen hidden md:block'
				style={{
					backgroundImage: 'url("/images/sign-in-frame.png")',
					backgroundSize: "cover",
					backgroundPosition: "cover",
				}}
			></div>
			<div className='flex flex-col px-[1em]  lg:px-[3em] py-[5em] space-y-[1.75em] w-full md:w-[50%] lg:w-[40%] h-screen overflow-auto'>
				<Image
					src='/images/sign-in-logo.svg'
					width={120}
					height={24}
					alt='logo'
				/>

				<div className='flex flex-col space-y-[1.5em] w-full'>
					<div className='flex flex-col space-y-[0.87em]'>
						<h1 className='tracking-[-0.96px] sodo600'>Verify your Email</h1>
						<h2 className='tracking-[-0.56px] sodo400'>
							An OTP has been sent to <span className='sodo600'>{data?.email}</span>,
							enter it to verify your email address.{" "}
						</h2>
					</div>

					<div className='grid grid-cols-6 md:gap-[1em] min-h-[56px] !mt-[2em] !mb-[3em]'>
						{[1, 2, 3, 4, 5, 6].map((index) => (
							<div key={index}>
								<input
									type='text'
									name={`input${index}`}
									onChange={(e) => {
										handleChange(e);
									}}
									id={`input${index}`}
									maxLength='1'
									className=' h-[2em] lg:h-[56px] w-[2em] lg:w-[56px]  outline-none px-[0.5em] text-center text-[1.5em] rounded-[4px] border border-[#E6E6E6]'
								/>
							</div>
						))}
					</div>

					<div className='flex space-x-[0.5em] !mb-[6.375em] items-center justify-center '>
						<CountdownTimer
							initialTime={60}
							onFinish={handleTimeFinish}
							className='text-[#072A85] text-[14px] sodo600 tracking-[-0.28px] '
						/>
						<div className='flex items-center'>
                        <h2 className='text-[#AAAEB8] tracking-[-0.28px] sodo400'>
							Didn’t receive?{" "}
						</h2>
						<Button variant='text' disabled={textBtnDisabled} onClick={handleTextBtnClick}>
							<span className={`cursor-pointer sodo600 normal-case ${textBtnDisabled === false && "text-[#072A85]"} `}>
								Resend OTP
							</span>
						</Button>
                        </div>
					</div>

					<div className='w-full'>
						<AuthBtn
							text='Continue'
							padding='1.2em 2em'
							loading={btnLoading}
							handleClick={handleClick}
							disabled={disabled}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
