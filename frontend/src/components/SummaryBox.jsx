import React from "react";

export default function SummaryBox({ percentChange, startYear }) {
    return (
        <div className="bg-indigo-900 bg-opacity-70 p-4 rounded-md shadow-md mb-6 max-w-md">
            <h2 className="text-xl font-bold mb-2">Summary Insights</h2>
            <p className="text-lg">
                Heatwaves have <span className="font-extrabold">{percentChange}%</span> increased in this region since{" "}
                <span className="font-extrabold">{startYear}</span>.
            </p>
        </div>
    );
}
