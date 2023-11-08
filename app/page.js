"use client";
import DashBtn from "@/components/DashBtn";
import Input from "@/components/Input";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);
	const router = useRouter();
	const handleClick = () => {
		console.log("clicked");
		router.push("/");
	};

	useEffect(() => {
		if (email === "" || password === "") {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [email, password]);

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
			<div className='flex flex-col md:px-[3em] md:pt-[5em] md:space-y-[6.2em] w-full md:w-[40%]'>
				<Image
					src='/images/sign-in-logo.svg'
					width={120}
					height={24}
					alt='logo'
				/>

				<div className='flex flex-col space-y-[1.5em] w-full'>
					<div className='flex flex-col space-y-[1em]'>
						<h1>Sign In</h1>
						<h3 className="tracking-[0.28px]">
							New to Serveup?{" "}
							<Link href='/Signup' className='text-[#072A85]'>
								Sign up
							</Link>{" "}
						</h3>
					</div>

					<div className='flex flex-col space-y-[1em]'>
						<Input
							text='Email/phone number'
							onChange={(e) => setEmail(e.target.value)}
							
						/>
						<Input
							text='Password'
							type='password'
						
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className='w-fit'>
						<DashBtn
							text='Sign in'
							padding='1.2em 2em'
							handleClick={handleClick}
							disabled={disabled}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
