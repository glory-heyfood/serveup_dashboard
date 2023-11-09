"use client";
import AuthBtn from "@/components/AuthBtn";

import Input from "@/components/Input";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [number, setNumber] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [check, setCheck] = useState(false);
	const router = useRouter();
	const handleClick = () => {
		router.push("/signup/verify-email");
	};

	useEffect(() => {
		if (email === "" || number === "" || password === "" || check === false) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [email, number, password, check]);
	return (
		<div className='flex'>
			<div
				className='w-[50%] lg:w-[60%] h-screen hidden sm:block '
				style={{
					backgroundImage: 'url("/images/sign-in-frame.png")',
					backgroundSize: "cover",
					backgroundPosition: "cover",
				}}
			></div>
			<div className='flex flex-col px-[1em] pt-[3em] lg:px-[3em] md:pt-[5em] space-y-[3.2em] w-full md:w-[50%] lg:w-[60%]'>
				<Image
					src='/images/sign-in-logo.svg'
					width={120}
					height={24}
					alt='logo'
				/>

				<div className='flex flex-col space-y-[1.5em] w-full'>
					<div className='flex flex-col space-y-[1em]'>
						<h1 className='tracking-[-0.96px]'>Let’s create your account</h1>
						<h2 className='tracking-[-0.28px] text-[14px] sodoSemiBold '>
							Already have a Serveup account?
							<Link href='/' className='text-[#072A85]'>
								{" "}
								Sign in
							</Link>{" "}
						</h2>
					</div>

					<div className='flex flex-col space-y-[1em]'>
						<Input
							text='Enter your email'
							type='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							text='Enter your phone number'
							onChange={(e) => setNumber(e.target.value)}
						/>
						<Input
							text='Create your password'
							type='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className='flex space-x-[1em] items-center'>
						<input
							type='checkbox'
							className='h-[16px] w-[16px]'
							onChange={(e) => {
								setCheck(e.target.checked);
								console.log(e.target.checked);
							}}
						/>
						<p className='text-[0.82em] sodoSemiBold tracking-[-0.52px] '>
							I agree to Serveup’s{" "}
							<Link href='' className='text-[#072A85]'>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link href='' className='text-[#072A85]'>
								Privacy Policy
							</Link>
						</p>
					</div>

					<div className='w-full'>
						<AuthBtn
							disabled={disabled}
							text='Continue'
							padding='16px 32px'
							handleClick={handleClick}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
