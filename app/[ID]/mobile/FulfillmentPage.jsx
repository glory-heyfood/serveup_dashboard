import MarketingLayout from "@/components/MarketingLayout";
import React from "react";
import GridComponent from "./GridComponent";
import BreadCrumb from "@/components/BreadCrumb";
import FulfillmentItems from "./FulfillmentItems";

const FulfillmentPage = () => {
	return (
		<MarketingLayout GridComponent={<GridComponent />}>
			<div>
				<BreadCrumb main='Mobile App' link='Fulfillment' />
				<div className='flex space-y-[16px] flex-col mt-[40px]'>
					<FulfillmentItems
						header='Pickup'
						text='Allow customers physically pickup orders from your store'
					/>
					<FulfillmentItems
						header='Delivery'
						text='Allow customers physically pickup orders from your store'
					/>
					<FulfillmentItems
						header='Order Scheduling'
						text='Allow customers place orders ahead of delivery time'
					/>
				</div>
			</div>
		</MarketingLayout>
	);
};

export default FulfillmentPage;
