import MarketingLayout from "@/components/MarketingLayout";
import React from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";

const OverviewPage = () => {
	return (
		<MarketingLayout GridComponent={<GridComponent />}>
			<BreadCrumb main='Mobile App' link='Overview' />
		</MarketingLayout>
	);
};

export default OverviewPage;
