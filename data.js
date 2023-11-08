import { bellIcon, briefcaseICon, chartIcon, companyIcon, marketingIcon, mobileIcon, promotionICon, rewardIcon, storeIcon, userIcon, websiteIcon } from "./SVGs";

export const Pricing = [
	{
		name: "Free",
		text: "Catering to individuals and small ventures, our Free Plan offers essential tools and resources without any cost.",
		price: "0",
		plans: [
			"Online ordering and delivery",
			"Pickup order",
			"Order scheduling",
			"Website",
			"Dine-in orders",
			"Online payment",
			"Order management",
			"Business Analytics",
			"500 order history",
			"1 Dine-in table",
		],
	},

	{
		name: "Starter",
		text: "Perfect for emerging entrepreneurs and small businesses looking to kickstart their online presence.",
		price: "10,000",
		plans: [
			"Online ordering and delivery",
			"Pickup order",
			"Order scheduling",
			"Website",
			"Dine-in orders",
			"Online payment",
			"Order management",
			"Business Analytics",
			"Full website customization",
			"Email Marketing",
			"Customer data analytics",
			"Unlimited order history",
			"20 Dine-in table",
			"Up to 5 employees",
			"Up to 4 locations",
			"2.5% Processing fee",
		],
	},

	{
		name: "Growth",
		text: "Tailored for businesses with their eyes set on expansion. It offers advanced features and resources designed to fuel your growth journey.",
		price: "40,000",
		plans: [
			"Online ordering and delivery",
			"Pickup order",
			"Order scheduling",
			"Website",
			"Dine-in orders",
			"Online payment",
			"Order management",
			"Business Analytics",
			"Full website customization",
			"Email Marketing",
			"Customer data analytics",
			"Unlimited order history",
			"50 Dine-in table",
			"Up to 100 employees",
			"Up to 4 locations",
			"2.5% Processing fee",
			"Branded mobile app",
			"Export customer data",
			"Customer loyalty program",
			"Up to 25 loyalty rewards",
		],
	},

	{
		name: "Enterprice",
		text: "Meticulously designed for established businesses and industry leaders seeking a comprehensive and highly customizable solution.",
		price: "CUSTOM PRICING",
		plans: [
			"Online ordering and delivery",
			"Pickup order",
			"Order scheduling",
			"Website",
			"Dine-in orders",
			"Online payment",
			"Order management",
			"Business Analytics",
			"Full website customization",
			"Email Marketing",
			"Customer data analytics",
			"Unlimited order history",
			"Unlimited Dine-in table",
			"Unlimited employees",
			"Unlimited locations",
			"View & control customer deposit",
			"Branded mobile app",
			"Export customer data",
			"Customer loyalty program",
			"Unlimited loyalty rewards",
		],
	},
];


// Data for side bar dashboard
export const sidebarData = [
    {
        icon:bellIcon,
        text:"New orders",
        href:"/Dashboard"
    },

    {
        icon:chartIcon,
        text:"Analytics",
        href:""
    },

    {
        icon:storeIcon,
        text:"Stores",
        href:""
    },

    {
        icon:userIcon,
        text:"Customers",
        href:""
    },

    {
        icon:marketingIcon,
        text:"Marketing",
        href:""
    },
    {
        icon:rewardIcon,
        text:"Loyalty Rewards",
        href:""
    },
    {
        icon:promotionICon,
        text:"Promotions",
        href:""
    },
    {
        icon:briefcaseICon,
        text:"Employees",
        href:""
    },
    {
        icon:websiteIcon,
        text:"Website",
        href:""
    },
    {
        icon:mobileIcon,
        text:"Mobile App",
        href:""
    },
    {
        icon:companyIcon,
        text:"Business Settings",
        href:""
    },
]