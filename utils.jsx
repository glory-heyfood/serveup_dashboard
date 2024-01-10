// Function for hanling the API calls
import { toast } from "react-toastify";
export const toastOptions = {
	position: "top-right",
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
};
export const handleAPI = async (promise) => {
	try {
		const response = await promise;
		if (response.data.message !== "") {
			toast.success(response.data.message, toastOptions);
		}
		return response;
	} catch (error) {
		if (error.response) {
			toast.error(error.response.data.message, toastOptions);
		} else {
			toast.error(error.message, toastOptions);
		}
	}
};

export const isPasswordStrong = (password) => {
	if (password.length < 8) {
		return false;
	} else {
		return true;
	}
};

// this functions return the number of strings u want
// exmple string = glory , if u do getStringCharacter(0,3) you will get glo
export const getSubstring = (start, end, string) => {
	return string?.slice(start, end);
};

export const searchArrayforEmployeeAndCustomer = (dataArray, searchInput) => {
	const filteredArray = dataArray.filter(
		(item) =>
			`${item.first_name} ${item.last_name}`
				.toLowerCase()
				.includes(searchInput.toLowerCase()) ||
			item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
			item.phone_number.toLowerCase().includes(searchInput.toLowerCase()),
	);
	return filteredArray;
};

export const searchArrayForStores = (dataArray, searchInput) => {
	const filteredArray = dataArray.filter((item) =>
		item.name.toLowerCase().includes(searchInput.toLowerCase()),
	);
	return filteredArray;
};
