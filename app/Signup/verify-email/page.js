"use client";
import AuthBtn from "@/components/Auth/AuthBtn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
	const router = useRouter();
	const handleClick = () => {
		router.push("/signup/business-info");
	};

	useEffect(() => {
		const handlePaste = (event) => {
			const pastedValue = event.clipboardData.getData("text");

			for (let i = 0; i < pastedValue.length && i < 6; i++) {
				const inputIndex = i + 1;
				document.getElementById(`input${inputIndex}`).value = pastedValue[i];
			}

			event.preventDefault();
		};

		window.addEventListener("paste", handlePaste);

		return () => {
			window.removeEventListener("paste", handlePaste);
		};
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
							An OTP has been sent to{" "}
							<span className='sodo600'>toastiesng@toasties.ng</span>, enter it
							to verify your email address.{" "}
						</h2>
					</div>

					<div className='grid grid-cols-6 md:gap-[1em] min-h-[56px] !mt-[2em] !mb-[3em]'>
						{[1, 2, 3, 4, 5, 6].map((index) => (
							<div key={index}>
								<input
									type='text'
									id={`input${index}`}
									maxLength='1'
									className=' h-[2em] lg:h-[56px] w-[2em] lg:w-[56px]  outline-none px-[0.5em] text-center text-[1.5em] rounded-[4px] border border-[#E6E6E6]'
									// onInput={(event) => handleInput(event.target, event)}
								/>
							</div>
						))}
					</div>

					<div className='flex space-x-[0.5em] !mb-[6.375em] items-center justify-center '>
						<span className='text-[#072A85] text-[14px] sodo600 tracking-[-0.28px] '>
							0:58
						</span>
						<h2 className='text-[#AAAEB8] tracking-[-0.28px] sodo400'>
							Didn’t receive?{" "}
							<span className=' cursor-pointer sodo600'>Resend OTP</span>
						</h2>
					</div>

					<div className='w-full'>
						<AuthBtn
							text='Continue'
							padding='1.2em 2em'
							handleClick={handleClick}
							// disabled={disabled}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
