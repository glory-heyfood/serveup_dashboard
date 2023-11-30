import {
	bellIcon,
	briefcaseICon,
	chartIcon,
	companyIcon,
	marketingIcon,
	mobileIcon,
	promotionICon,
	rewardIcon,
	storeIcon,
	userIcon,
	websiteIcon,
} from "./SVGs";
import NewOrderCard from "./app/[ID]/NewOrderCard";

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
		name: "Enterprise",
		text: "Meticulously designed for established businesses and industry leaders seeking a comprehensive and highly customizable solution.",
		price: "Custom Pricing",
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

export const ID = "id"  // mock id

export const sidebarData = [
	{
		icon: bellIcon,
		text: "New orders",
		href: `/${ID}`,
	},

	{
		icon: chartIcon,
		text: "Analytics",
		href: `/${ID}/analytics`,
	},

	{
		icon: storeIcon,
		text: "Stores",
		href: `/${ID}/stores`,
	},

	{
		icon: userIcon,
		text: "Customers",
		href: `/${ID}/customers`,
	},

	{
		icon: marketingIcon,
		text: "Marketing",
		href: `/${ID}/marketing#/email`,
	},
	{
		icon: rewardIcon,
		text: "Loyalty rewards",
		href: `/${ID}/loyalty#/overview`,
	},
	{
		icon: promotionICon,
		text: "Promotions",
		href: `/${ID}/promotions`,
	},
	{
		icon: briefcaseICon,
		text: "Employees",
		href: `/${ID}/employees`,
	},
	{
		icon: websiteIcon,
		text: "Website",
		href: `/${ID}/website#/theme`,
	},
	{
		icon: mobileIcon,
		text: "Mobile App",
		href: `/${ID}/mobile`,
	},
	{
		icon: companyIcon,
		text: "Business Settings",
		href: `/${ID}/business`,
	},
];

export const options = [
	{ label: "selecc", value: "irr" },
	{ label: "pooo", value: "ee" },
	{ label: "pooo", value: "ee" },
	{ label: "pooo", value: "ee" },
	{ label: "pooo", value: "ee" },
	{ label: "pooo", value: "ee" },
];

export const customerData = [
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
	{
		name: "Katherine Alariko",
		email: "Kattyriko@gmail.com",
	},
];

export const campaignData = [
	{
		name: "Weekly Newsletter",
		Status: "Sent",
		Opens: 224,
		Clicks: 138,
		DeliveryDate: "Wed Oct 4, 2023 . 10:00 AM",
	},
	{
		name: "Monthly Newsletter",
		Status: "Pending",
		Opens: 224,
		Clicks: 138,
		DeliveryDate: "Thu Oct 1, 2023 . 10:00 AM",
	},
	{
		name: "Promotional Email",
		Status: "Draft",
		Opens: 120,
		Clicks: 65,
		DeliveryDate: "Fri Oct 20, 2023 . 3:30 PM",
	},
	{
		name: "Product Announcement",
		Status: "Sent",
		Opens: 300,
		Clicks: 200,
		DeliveryDate: "Tue Oct 15, 2023 . 2:00 PM",
	},
	{
		name: "New Campaign 1",
		Status: "Draft",
		Opens: 150,
		Clicks: 80,
		DeliveryDate: "Mon Oct 10, 2023 . 11:30 AM",
	},
	{
		name: "Special Promotion",
		Status: "Sent",
		Opens: 180,
		Clicks: 120,
		DeliveryDate: "Sat Oct 5, 2023 . 1:45 PM",
	},
	{
		name: "Black Friday Sale",
		Status: "Sent",
		Opens: 250,
		Clicks: 150,
		DeliveryDate: "Fri Nov 25, 2023 . 9:00 AM",
	},
	{
		name: "Holiday Greetings",
		Status: "Draft",
		Opens: 100,
		Clicks: 50,
		DeliveryDate: "Wed Dec 20, 2023 . 3:30 PM",
	},
	{
		name: "Year-End Recap",
		Status: "Sent",
		Opens: 280,
		Clicks: 180,
		DeliveryDate: "Sat Dec 30, 2023 . 11:00 AM",
	},

	{
		name: "New Year Wishes",
		Status: "Sent",
		Opens: 200,
		Clicks: 120,
		DeliveryDate: "Sun Jan 1, 2024 . 12:01 AM",
	},
	{
		name: "Valentine's Day Promo",
		Status: "Draft",
		Opens: 80,
		Clicks: 40,
		DeliveryDate: "Tue Feb 14, 2024 . 11:30 AM",
	},
	{
		name: "Spring Sale",
		Status: "Sent",
		Opens: 300,
		Clicks: 200,
		DeliveryDate: "Fri Mar 20, 2024 . 10:00 AM",
	},
	{
		name: "Easter Specials",
		Status: "Draft",
		Opens: 120,
		Clicks: 80,
		DeliveryDate: "Sun Apr 4, 2024 . 2:00 PM",
	},
	{
		name: "Mother's Day Celebration",
		Status: "Sent",
		Opens: 180,
		Clicks: 120,
		DeliveryDate: "Sun May 12, 2024 . 3:30 PM",
	},
	{
		name: "Summer Discounts",
		Status: "Sent",
		Opens: 250,
		Clicks: 150,
		DeliveryDate: "Fri Jun 21, 2024 . 12:00 PM",
	},
	{
		name: "Independence Day Special",
		Status: "Draft",
		Opens: 100,
		Clicks: 50,
		DeliveryDate: "Thu Jul 4, 2024 . 9:00 AM",
	},
	{
		name: "Back-to-School Offers",
		Status: "Sent",
		Opens: 200,
		Clicks: 120,
		DeliveryDate: "Mon Aug 26, 2024 . 10:30 AM",
	},
	{
		name: "Autumn Preview",
		Status: "Draft",
		Opens: 80,
		Clicks: 40,
		DeliveryDate: "Tue Sep 10, 2024 . 2:30 PM",
	},
];

export const sendCampaignData = (page, noOfRows, tab) => {
	if (tab === "All") {
		return {
			data: campaignData.slice(page * noOfRows, page * noOfRows + noOfRows),
			length: campaignData.length,
		};
	}

	if (tab === "Sent") {
		const newArr = [];
		campaignData.map((data) => {
			if (data.Status === "Sent") {
				newArr.push(data);
			}
		});

		return {
			data: newArr.slice(page * noOfRows, page * noOfRows + noOfRows),
			length: newArr.length,
		};
	}

	if (tab === "Draft") {
		const newArr = [];
		campaignData.map((data) => {
			if (data.Status === "Draft") {
				newArr.push(data);
			}
		});

		return {
			data: newArr.slice(page * noOfRows, page * noOfRows + noOfRows),
			length: newArr.length,
		};
	}

	if (tab === "Pending") {
		const newArr = [];
		campaignData.map((data) => {
			if (data.Status === "Pending") {
				newArr.push(data);
			}
		});

		return {
			data: newArr.slice(page * noOfRows, page * noOfRows + noOfRows),
			length: newArr.length,
		};
	}
};

export const getCampaignDataLength = () => {
	return campaignData.length;
};

export const AddStoreLabeDateInputData = [
	{
		label: "Monday",
	},
	{
		label: "Tuesday",
	},
	{
		label: "Wednesday",
	},
	{
		label: "Thursday",
	},
	{
		label: "Friday",
	},
	{
		label: "Saturday",
	},
	{
		label: "Sunday",
	},
];


export const rewardOptions = [
    {
        value: "10 ",
        description: "10 naira off your order",
        discount:"10",
        discountType:"Amount",
        rewardType:"orderDiscount"
    },
    {
        value: "20 ",
        description: "20% off your order",
        discount:"20",
        discountType:"Percent",
        rewardType:"orderDiscount"
    },
    {
        value: "30 ",
        description: "30% off your order",
        discount:"30",
        discountType:"Percent",
        rewardType:"orderDiscount"
    },
    {
        value: "40 ",
        description: "free delivery",
        discount:"100",
        discountType:"Percent",
        rewardType:"deliveryDiscount"
    },
]

export const EmployeeData = [
	{
		name: "Katherine Alariko",
		role: "Admin",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
	{
		name: "Katherine Alariko",
		role: "Employee",
	},
];