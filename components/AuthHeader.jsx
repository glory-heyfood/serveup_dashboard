import Image from "next/image";
import React from "react";
import Link from "next/link";
import AuthBtn from "./AuthBtn";

const AuthHeader = ({ disabled, handleClick }) => {
	return (
		<div
			className='flex justify-between py-[0.5em] md:pr-[2.5em] md:pl-[1.5em] px-[1em]'
			style={{
				boxShadow: " 0px 1px 0px 0px #E6E6E6",
			}}
		>
			<Link href='/'>
				<Image height={24} width={24} src='/images/logo.svg' alt='logo' />
			</Link>

			<div className='w-[80px]'>
				<AuthBtn
					text='Next'
					padding='8px 32px'
					disabled={disabled}
					handleClick={handleClick}
				/>
			</div>
		</div>
	);
};

export default AuthHeader;
