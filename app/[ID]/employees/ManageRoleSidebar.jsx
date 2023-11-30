import { XIcon, plusIcon } from "@/SVGs";
import DashBtn from "@/components/buttons/DashBtn";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "@/redux/features/toggleModalSlice";

const ManageRoleSidebar = ({ setShowManageRoles }) => {
    const dispatch = useDispatch();
	const roles = [
		"Admin",
		"General Manager",
		"Store Manage",
		"Chief Operation officer",
		"Head Cook",
	];
	return (
		<>
			<div
				className='flex items-start  w-[35%] min-w-[380px] max-w-[400px] pt-[91px] md:pl-[42px] lg:pl-[52px] xl:pl-[64px]  '
				style={{
					boxShadow: "1.1px 0px 0px 0px #E6E6E6",
				}}
			>
				<span
					className='w-[32px] cursor-pointer'
					onClick={() => {
						setShowManageRoles(false);
					}}
				>
					{XIcon}
				</span>

				<div className=''>
					<div className='flex flex-col space-y-[32px] pl-[24px] pr-[20px] '>
						<h1 className='text-[20px] sodo700 tracking-[-0.8px] '>
							Manage roles
						</h1>
						<div className='flex flex-col space-y-[16px]'>
							<div className='flex flex-col space-y-[4px]'>
								<h2 className='text-[14px] sodo600 tracking-[-0.56px]  '>
									Custom roles
								</h2>
								<h3 className='text-[#5F6370] text-[12px] sodo400 tracking-[-0.24px] leading-[15px]'>
									Create custom roles to define responsibility and access for
									your employees.
								</h3>
							</div>

							<span className='w-fit'>
								<DashBtn
									text='Create custom role'
									icon={plusIcon}
									padding='10px 14px'
									handleClick={() => {
										dispatch(toggleModal(true));
									}}
								/>
							</span>
						</div>
					</div>

					<hr className='bg-[#F0F0F0] h-[1px] w-full my-[24px]' />

					<div className='pl-[24px] pr-[20px]'>
						<h1 className='text-black sodo600 text-[14px] tracking-[-0.24px] mb-[24px]'>
							Default roles
						</h1>
						<div className='flex flex-col space-y-[24px]'>
							{roles.map((data, i) => (
								<h2 key={i} className='text-black sodo400 text-[12px] tracking-[-0.24px] '>
									{data}
								</h2>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ManageRoleSidebar;
