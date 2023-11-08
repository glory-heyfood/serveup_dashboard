"use client";
import AuthHeader from "@/components/AuthHeader";
import PriceCard from "@/components/PriceCard";
import { Pricing } from "@/data";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
	const [selectedCard, setSelectedCard] = useState(null);
    const [disabled, setDisabled] = useState(true)
	const router = useRouter();

	const handleClick = () => {
		router.push("/axori2");
	};

	const handleCardClick = (card) => {
		setDisabled(false)
        setSelectedCard(card);
	};
	return (
		<div>
			<AuthHeader disabled={disabled} handleClick={handleClick} />

			<div className='px-[1em]  sm:px-[5em] w-full  mt-[2.5em] mb-[120px] overflow-hidden'>
				<h1 className='text-center mb-[2.7em]'>Choose your pricing plan</h1>

				<div className='flex-wrap xl:flex-nowrap flex  items-start xl:justify-center  gap-[16px] w-full mx-auto'>
					{Pricing.map((data, i) => (
						<PriceCard
							key={i}
							index={i}
							data={data}
							isSelected={selectedCard === data}
							onCardClick={handleCardClick}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Page;
