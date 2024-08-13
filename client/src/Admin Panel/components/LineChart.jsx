import React from 'react';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom'; // Import zoom plugin
import { useEffect, useState } from 'react';

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin // Register zoom plugin
);

const LineChart = ({variable = "Value" , labels , data , heading="Line graph"}) => {

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                // Create the chart data
                const chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: `${heading}`,
                            data: data,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                        },
                    ],
                };

                setChartData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Run once on component mount

    const options = {

        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${variable} : ${context.raw}`
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0, // Set the minimum value for the y-axis
            },
            x: {
                // max:360
            }
        },

        responsive: true,
        maintainAspectRatio: false
    };

    return chartData ? <Line data={chartData} options={options} /> : null
};

export default LineChart;