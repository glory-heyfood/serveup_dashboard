import DashHeader from "@/components/Dashboard/DashHeader";
import React from "react";
import ManageRoleSidebar from "./ManageRoleSidebar";
import { briefcaseFilledIcon } from "@/SVGs";
import { useDispatch, useSelector } from "react-redux";
import CreateCustomRoleModal from "./CreateCustomRoleModal";

const ManageRoles = ({ children, setShowManageRoles }) => {
	const modal = useSelector((state) => state.modal.showModal);

	const data = Array.from({ length: 20 }, (_, index) => "");
	return (
		<div className='h-screen w-full '>
			<DashHeader />
			{/* I am calculating the padding top if there is a button the pt is 6px lower cause for the padding of the button */}
			<div className={`flex h-full  w-full `}>
				<ManageRoleSidebar setShowManageRoles={setShowManageRoles} />
				<div className=' px-[20px] md:px-[32px] pt-[96px]  h-screen  relative overflow-auto scroll-hidden  w-full '>
					<div className='flex space-x-[8px] mb-[32px] items-center'>
						<span>{briefcaseFilledIcon}</span>
						<h2 className='text-[17px] sodo700 tracking-[-0.64px] font-[900] '>
							General Manager
						</h2>
					</div>
					<div className='flex items-center justify-between h-[16px] pb-[16px] border-[1px] border-transparent border-b-[#F0F0F0] pr-[22px]'>
						<h3 className='text-[12px] tracking-[-0.24px] sodo700 '>
							What this role can access
						</h3>
						<h3 className='text-[#072A85] text-[12px] sodo700 tracking-[-0.24px] '>
							Edit
						</h3>
					</div>
					<div className='flex flex-col'>
						{data.map((_, i) => (
							<div
								key={i}
								className='bg-white h-[64px] flex items-center border-[0.5px] border-transparent border-t-[#f3f2f2]'
							>
								<h1 className='text-black text-[12px] tracking-[-0.24px] sodo600 '>
									Analytics
								</h1>
							</div>
						))}
					</div>
				</div>
			</div>
			{modal && <CreateCustomRoleModal />}
		</div>
	);
};

export default ManageRoles;
