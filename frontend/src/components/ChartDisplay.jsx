import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ChartDisplay({ summary }) {
    const chartRef = useRef();

    useEffect(() => {
        if (!summary) return;

        const ctx = chartRef.current.getContext("2d");

        // Prepare data for chart
        const years = Object.keys(summary).sort();
        const counts = years.map((year) => summary[year].duration.count);

        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: years,
                datasets: [
                    {
                        label: "Heatwave Count",
                        data: counts,
                        fill: true,
                        backgroundColor: "rgba(79, 70, 229, 0.3)", // Indigo 500 opacity 30%
                        borderColor: "rgba(79, 70, 229, 1)",       // Indigo 500
                        borderWidth: 2,
                        tension: 0.3,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: "#e0e7ff" } },
                    tooltip: { mode: "index", intersect: false },
                },
                scales: {
                    x: {
                        ticks: { color: "#c7d2fe" },
                        title: { display: true, text: "Year", color: "#a5b4fc" },
                    },
                    y: {
                        ticks: { color: "#c7d2fe" },
                        title: { display: true, text: "Heatwave Count", color: "#a5b4fc" },
                        beginAtZero: true,
                        precision: 0,
                    },
                },
            },
        });

        return () => {
            chart.destroy();
        };
    }, [summary]);

    return (
        <div className="bg-indigo-900 bg-opacity-70 rounded-md p-4 shadow-md max-w-4xl mx-auto">
            <canvas ref={chartRef} />
        </div>
    );
}
