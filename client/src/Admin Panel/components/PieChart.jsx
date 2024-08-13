import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart = ({ values }) => {


    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const chartData = {
            labels: ['Basic', 'Easy', 'Medium', 'Hard'],
            datasets: [
                {
                    data: values, 
                    // data: [10, 20, 30, 40], 
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 3,
                },
            ],
        };
        setChartData(prev => chartData)
    }, [])



    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
            title: {
                display: true,
                text: 'Problem Distribution',
                font: {
                  size: 18,
                  weight: 'bold',
                },
                padding: {
                  top: 10,
                  bottom: 30,
                },
              },
        },
        animation: {
            duration: 500, // Animation duration in milliseconds
            easing: 'linear' // Easing function for the animation
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return !chartData ? null : (
        <Pie data={chartData} options={options} />
    );
};

export default PieChart;