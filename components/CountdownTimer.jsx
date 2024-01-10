import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime, onFinish, className }) => {
	const [time, setTime] = useState(initialTime);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (time <= 0) {
				clearInterval(intervalId);
				onFinish();
			} else {
				setTime((prevTime) => prevTime - 1);
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [time, onFinish]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		return `${String(minutes).padStart(2, "0")}:${String(
			remainingSeconds,
		).padStart(2, "0")}`;
	};

	return <div className={className}>{formatTime(time)}</div>;
};

export default CountdownTimer;
