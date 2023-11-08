"use client";
import DashBtn from "@/components/DashBtn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
	const router = useRouter();
	const handleClick = () => {
		router.push("/signup/business-info");
	};
	return (
		<div className='flex'>
			<div
				className='w-[60%] h-screen'
				style={{
					backgroundImage: 'url("/images/sign-in-frame.png")',
					backgroundSize: "cover",
					backgroundPosition: "cover",
				}}
			></div>
			<div className='flex flex-col px-[1em]  md:px-[3em] py-[5em] space-y-[1.75em] w-full md:w-[40%] h-screen overflow-auto'>
				<Image
					src='/images/sign-in-logo.svg'
					width={120}
					height={24}
					alt='logo'
				/>

				<div className='flex flex-col space-y-[1.5em] w-full'>
					<div className='flex flex-col space-y-[0.87em]'>
						<h1 className='tracking-[-0.96px]'>Verify your Email</h1>
						<h2 className='tracking-[-0.56px]'>
							An OTP has been sent to{" "}
							<span className='sodoBold'>toastiesng@toasties.ng</span>, enter it
							to verify your email address.{" "}
						</h2>
					</div>

					<div className='flex space-x-[1em] !mt-[2em] !mb-[5em]'>
						<input
							type='text'
							className='h-[56px] w-[56px] outline-none px-[0.5em] text-center text-[1.5em] rounded-[4px] border border-[#E6E6E6]'
						/>
						<input
							type='text'
							className='h-[56px] w-[56px] outline-none px-[0.5em] text-center text-[1.5em] rounded-[4px] border border-[#E6E6E6]'
						/>
						<input
							type='text'
							className='h-[56px] w-[56px] outline-none px-[0.5em] text-center text-[1.5em] rounded-[4px] border border-[#E6E6E6]'
						/>
						<input
							type='text'
							className='h-[56px] w-[56px] outline-none px-[0.5em] text-center text-[1.5em] rounded-[4px] border border-[#E6E6E6]'
						/>
						<input
							type='text'
							className='h-[56px] w-[56px] outline-none px-[0.5em] text-center text-[1.5em] rounded-[4px] border border-[#E6E6E6]'
						/>
						<input
							type='text'
							className='h-[56px] w-[56px] outline-none px-[0.5em] text-center text-[1.5em] rounded-[4px] border border-[#E6E6E6]'
						/>
					</div>

					<div className='flex space-x-[0.5em] !mb-[8.375em] items-center justify-center '>
						<span className='text-[#072A85] text-[14px] sodoBold tracking-[-0.28px] '>
							0:58
						</span>
						<h2 className='text-[#AAAEB8] tracking-[-0.28px]'>
							Didn’t receive? Resend OTP
						</h2>
					</div>

					<div className='w-full'>
						<DashBtn
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
