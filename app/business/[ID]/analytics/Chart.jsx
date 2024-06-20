import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
	const chartRef = useRef(null);
	const maxBarWidth = 10;

	useEffect(() => {
		const ctx = chartRef.current.getContext("2d");

		// Check if there's an existing Chart instance
		if (chartRef.current.chart) {
			chartRef.current.chart.destroy();
		}

		// Initialize a new Chart
		const newChart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
				datasets: [
					{
						data: [350000, 450000, 290000, 250000, 350000, 450000, 450000],
						backgroundColor: [
							"#B6C7F2",
							"#B6C7F2",
							"#B6C7F2",
							"#B6C7F2",
							"#B6C7F2",
						],
						borderColor: [
							"#B6C7F2",
							"#B6C7F2",
							"#B6C7F2",
							"#B6C7F2",
							"#B6C7F2",
						],
						borderWidth: 1,
						barPercentage: 0.5,
					},
				],
			},
			options: {
				scales: {
					x: {
						beginAtZero: true,
						grid: {
							display: false,
						},
					},
					y: {
						max: 1000000,
						beginAtZero: true,
					},
				},
				plugins: {
					legend: {
						display: false, // Hide the legend (dataset label)
					},
				},
				elements: {
					bar: {
						borderWidth: 2,
						borderSkipped: "bottom",
						maxBarThickness: maxBarWidth, // Set the maximum bar thickness
					},
				},
				animation: {
					onComplete: (animation) => {
						// Animate the bars when the chart is loaded
						if (animation.numSteps === 0) {
							newChart.data.datasets.forEach((dataset, datasetIndex) => {
								const meta = newChart.getDatasetMeta(datasetIndex);
								meta.data.forEach((bar, index) => {
									const model = bar._model;
									model.y = 0;
									Chart.animate({
										duration: 500,
										easing: "easeOutQuad",
										onUpdate: (animation) => {
											model.y =
												(animation.currentStep / animation.numSteps) *
												model.base;
										},
									});
								});
							});
						}
					},
				},
			},
		});

		// Save the Chart instance in the ref
		chartRef.current.chart = newChart;
	}, []);

	return (
		<div style={{ width: "100%", margin: "auto" }}>
			<canvas ref={chartRef} />
		</div>
	);
};

export default BarChart;
