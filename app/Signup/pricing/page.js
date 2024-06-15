"use client";
import AuthHeader from "@/components/Auth/AuthHeader";
import PriceCard from "@/components/PriceCard";
import { Pricing } from "@/data";
import { updateSubscriptionPlanAsync } from "@/redux/features/business/businessSlice";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
	const [selectedCard, setSelectedCard] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [data, setData] = useState();
	const router = useRouter();
	const dispatch = useDispatch();

	const handleClick = () => {
		const payload = {
			subscription_plan: selectedCard.name,
			id: data.id,
		};
		dispatch(updateSubscriptionPlanAsync(payload))
			.unwrap()
			.then((res) => {
				console.log(res);
				if (res) {
					router.push(`/${res.data[0].id}`);
				}
			});
	};

	const handleCardClick = (card) => {
		console.log(card);
		setDisabled(false);
		setSelectedCard(card);
	};

	useEffect(() => {
		const dat = JSON.parse(window.localStorage.getItem("serveup_business"));
		setData(dat);
	}, []);
	return (
		<div>
			<AuthHeader disabled={disabled} handleClick={handleClick} />

			<div className='px-[1em]  sm:px-[5em] w-full  mt-[2.5em] mb-[120px] overflow-hidden'>
				<h1 className='text-center mb-[2em] sodo600 tracking-[-0.96px]'>
					Choose your pricing plan
				</h1>

				<div className='flex-wrap xl:flex-nowrap flex  items-center  xl:justify-center justify-around gap-[16px] w-fit mx-auto'>
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
