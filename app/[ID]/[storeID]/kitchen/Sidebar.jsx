import { XIcon, bellIconSmall } from "@/SVGs";
import React from "react";
import SidebarTab from "./SidebarTab";
import CustomSearch from "@/components/CustomSearch";
import SidebarCard from "./SidebarCard";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/features/toggleSideBarSlice";

const Sidebar = ({ handleClick, setTab, tab }) => {	
    const dispatch = useDispatch();    

	return (
		<div className="shrink-0">
			<div className='flex items-center space-x-[1rem]'>
				<span
					onClick={() => {
						handleClick();
					}}
				>
					{" "}
					{XIcon}{" "}
				</span>
				<h1 className='sodo700 tracking-[-0.8px] text-[1.25rem]'>Kitchen</h1>
			</div>

			<div className='flex space-x-[0.75rem] items-center mt-[3rem] mb-[1.5rem] '>
				<SidebarTab
					handleClick={() => {
						setTab("Needs Action");
					}}
					name='Needs Action'
					number='8'
					status={tab === "Needs Action" && "active"}
					icon={(color) => {
						bellIconSmall(color);
					}}
				/>
				<SidebarTab
					handleClick={() => {
						setTab("Preparing");
					}}
					name='Preparing'
					number='8'
					status={tab === "Preparing" && "active"}
					icon={(color) => {
						bellIconSmall(color);
					}}
				/>
				<SidebarTab
					handleClick={() => {
						setTab("Ready");
					}}
					name='Ready'
					number='8'
					status={tab === "Ready" && "active"}
					icon={(color) => {
						bellIconSmall(color);
					}}
				/>
			</div>

			<CustomSearch placeholder='Search' fullWidth />

			<div className='flex flex-col space-y-[1.25rem] mt-[1.5rem]'>
				<SidebarCard
					name='Esther Sanusi'
					time='2 mins ago'
					type='Delivery'
					status='active'
				/>
				<SidebarCard name='Esther Sanusi' time='2 mins ago' type='Delivery' />
				<SidebarCard
					name='Esther Sanusi'
					time='2 mins ago'
					type='Delivery'
					scheduled={true}
				/>
				<SidebarCard name='Esther Sanusi' time='2 mins ago' type='Delivery' />
				<SidebarCard
					name='Esther Sanusi'
					time='2 mins ago'
					type='Delivery'
					scheduled={true}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
