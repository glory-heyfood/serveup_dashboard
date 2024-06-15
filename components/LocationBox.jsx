"use client";
import useLocationSuggestions from "@/hooks/useLocationSuggestions";
import React, { useState } from "react";

const LocationBox = () => {
	const [loader, setLoader] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const handleSuggestions = (suggestions) => {
		console.log(suggestions);
		setSuggestions(suggestions);
		setLoader(false);
	};

	const { getSuggestions, getDetails } =
		useLocationSuggestions(handleSuggestions);

	const [inputValue, setInputValue] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	const handleInputChange = (inputValue) => {
		if (inputValue) {
			setLoader(true);
			setShowModal(true);
		} else {
			setShowModal(false);
		}
		setInputValue(inputValue);
		getSuggestions(inputValue);
	};

	const handleLocationSelect = async (placeId) => {
		const locationDetails = await getDetails(placeId);
		setInputValue(locationDetails.address);
		setShowModal(false);
		console.log("Location Details:", locationDetails);
		setItemWithEvent("serveup_address", locationDetails.address);
	};

	return <div></div>;
};

export default LocationBox;
