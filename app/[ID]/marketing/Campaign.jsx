import CustomSearch from "@/components/CustomSearch";
import DashBtn from "@/components/Dashboard/DashBtn";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "./Table";
import { plusIcon } from "@/SVGs";

const Campaign = ({ handleClick }) => {
	const [isVisible, setIsVisible] = useState(false);

	// Show the button when the user scrolls down
	useEffect(() => {
		const handleScroll = () => {
            console.log(window)
            console.log("window")
			if (window.scrollY > 50) {
                console.log("here")
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Scroll to the top when the button is clicked
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
    
	return (
		<div>
			<div className='flex flex-col  md:flex-row md:items-center justify-between mb-[32px]  '>
				<div className='order-2 md:order-1 w-full md:w-fit'>
					<CustomSearch fullWidth placeholder='Search' />
				</div>
				<div className='inline-block w-fit order-1 md:order-2 mb-[24px] md:mb-0'>
					<DashBtn
						text='Create new campaign'
						icon={plusIcon}
						handleClick={handleClick}
					/>
				</div>
			</div>

			<div
				className={`${
					isVisible
						? "block fixed bottom-[60px] right-[40px] animate-bounce cursor-pointer "
						: "hidden fixed bottom-[60px] right-[40px] animate-bounce"
				}`}
				onClick={() => {
					scrollToTop();
				}}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='44'
					height='47'
					viewBox='0 0 44 47'
					fill='none'
				>
					<g filter='url(#filter0_d_209_2627)'>
						<circle
							cx='22'
							cy='20.4873'
							r='20'
							fill='url(#paint0_linear_209_2627)'
						/>
					</g>
					<path
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M21.0506 30.4873L21.065 12.6077C20.167 14.9211 17.6697 16.4811 14.4504 16.8874L14 14.9757C18.3958 14.5624 20.6901 12.4815 21.0767 9.13486H22.8606C23.1916 12.454 25.7564 14.6819 30 14.9741L29.4926 16.8928C26.4787 16.4847 23.9261 15.247 22.8626 12.6062L22.8813 30.4873H21.0506H21.0506Z'
						fill='white'
					/>
					<defs>
						<filter
							id='filter0_d_209_2627'
							x='0'
							y='0.487305'
							width='44'
							height='46'
							filterUnits='userSpaceOnUse'
							color-interpolation-filters='sRGB'
						>
							<feFlood flood-opacity='0' result='BackgroundImageFix' />
							<feColorMatrix
								in='SourceAlpha'
								type='matrix'
								values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
								result='hardAlpha'
							/>
							<feMorphology
								radius='2'
								operator='erode'
								in='SourceAlpha'
								result='effect1_dropShadow_209_2627'
							/>
							<feOffset dy='4' />
							<feGaussianBlur stdDeviation='2' />
							<feColorMatrix
								type='matrix'
								values='0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0 0.294118 0 0 0 0.08 0'
							/>
							<feBlend
								mode='normal'
								in2='BackgroundImageFix'
								result='effect1_dropShadow_209_2627'
							/>
							<feBlend
								mode='normal'
								in='SourceGraphic'
								in2='effect1_dropShadow_209_2627'
								result='shape'
							/>
						</filter>
						<linearGradient
							id='paint0_linear_209_2627'
							x1='22'
							y1='0.487305'
							x2='22'
							y2='40.4873'
							gradientUnits='userSpaceOnUse'
						>
							<stop stop-color='#FF6C1A' />
							<stop offset='1' stop-color='#FF443E' />
						</linearGradient>
					</defs>
				</svg>
			</div>

			<StickyHeadTable />
		</div>
	);
};

export default Campaign;
