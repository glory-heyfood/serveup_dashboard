import GridLayout from "@/components/GridLayout";
import React from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";

const OverviewPage = () => {
	return (
		<GridLayout GridComponent={<GridComponent />}>
			<BreadCrumb main='Mobile App' link='Overview' />
		</GridLayout>
	);
};

export default OverviewPage;
