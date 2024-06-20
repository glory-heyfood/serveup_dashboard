import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const DoughnutChart = ({ data, options }) => {
	const chartRef = useRef(null);
	const chartInstance = useRef(null);

	useEffect(() => {
		if (chartInstance.current) {
			chartInstance.current.destroy();
		}

		if (chartRef.current) {
			const ctx = chartRef.current.getContext("2d");
			chartInstance.current = new Chart(ctx, {
				type: "doughnut",
				data: data,
				options: options || {},
			});
		}

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [data, options]);

	return <canvas ref={chartRef} />;
};

const Charts = () => {
    const chartData = {
        labels: ['Segment 1', 'Segment 2'],
        datasets: [
          {
            data: [67, 33],
            backgroundColor: ['#436CD5', '#74006D'],
            hoverBackgroundColor: ['#436CD5', '#74006D'],
            borderWidth: 0,
          },
        ],
      };

      const chartOptions = {
        cutout: '70%', // Adjust the cutout to control the size of the doughnut
        plugins: {
          legend: false, // Hide the legend
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ${value}%`;
              },
            },
          },
        },
      };
    

	return <DoughnutChart data={chartData} options={chartOptions} />;
};

export default Charts;
