"useClient";
import React, { useEffect, useState } from "react";
import DashHeader from "./Dashboard/DashHeader";
import GridSideBar from "./sidebar/GridSideBar";

const MarketingLayout = ({ children, GridComponent }) => {
	const [gridContent, setGridContent] = useState(true);
	const [isVisible, setIsVisible] = useState(false);

	// Show the button when the user scrolls down
	const handleScroll = () => {
		console.log(window.scrollY);
		if (window.scrollY > 20) {
			console.log("here");
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

    useEffect(()=>{
window.addEventListener("scroll", handleScroll)
    },[])

	return (
		<div className='h-screen w-full '>
			<DashHeader />
			{/* I am calculating the padding top if there is a button the pt is 6px lower cause for the padding of the button */}
			<div className={`flex h-full  w-full `}>
				<GridSideBar
					gridContent={gridContent}
					setGridContent={setGridContent}
					GridComponent={GridComponent}
				/>
				<div
					className=' px-[20px] md:px-[32px] pt-[88px]  h-screen  relative overflow-auto scroll-hidden  w-full '
					// onScroll={() => {handleScroll()}}
				>
					{children}
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
		</div>
	);
};

export default MarketingLayout;
