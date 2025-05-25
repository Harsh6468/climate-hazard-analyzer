import React, { useState } from "react";
import ChartDisplay from "../components/ChartDisplay";
import SummaryBox from "../components/SummaryBox";
import MapSelector from "../components/MapSelector";
import { fetchHeatwaveData } from "../services/api";
import { exportCSV, exportPDF } from "../utils/export";
import { FaMapMarkerAlt, FaCalendarAlt, FaGlobe } from "react-icons/fa";

export default function Home() {
    const [location, setLocation] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [startYear, setStartYear] = useState(1990);
    const [endYear, setEndYear] = useState(2020);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!location && (!lat || !lon)) {
            setError("Please enter either a location or valid coordinates.");
            return;
        }
        if (startYear < 1990 || endYear > 2020 || startYear > endYear) {
            setError("Year range must be between 1990 and 2020.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            const result = await fetchHeatwaveData(location, lat, lon, startYear, endYear);
            setData(result);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white bg-opacity-20 rounded-xl p-8 shadow-lg text-white max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location */}
                <div>
                    <label className="flex items-center gap-2 text-[rgba(0,0,0,0.6)] font-medium mb-1">
                        <FaMapMarkerAlt className="text-[rgba(0,0,0,0.6)]" />
                        City or State (Optional)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Mumbai"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 rounded-md text-black"
                    />
                </div>

                {/* OR Separator */}
                <div className="text-center text-[rgba(0,0,0,0.6)] font-semibold">— OR —</div>

                {/* Coordinates */}
                <div>
                    <label className="flex items-center gap-2 text-[rgba(0,0,0,0.6)] font-medium mb-1">
                        <FaGlobe className="text-[rgba(0,0,0,0.6)]" />
                        Coordinates (Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            step="any"
                            placeholder="Latitude"
                            className="p-2 rounded-md text-black"
                        />
                        <input
                            type="number"
                            value={lon}
                            onChange={(e) => setLon(e.target.value)}
                            step="any"
                            placeholder="Longitude"
                            className="p-2 rounded-md text-black"
                        />
                    </div>
                </div>

                {/* Leaflet Map */}
                <MapSelector lat={lat} lon={lon} setLat={setLat} setLon={setLon} />

                {/* Year range */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="flex items-center gap-2 text-[rgba(0,0,0,0.6)] font-medium mb-1">
                            <FaCalendarAlt className="text-[rgba(0,0,0,0.6)]" />
                            Start Year
                        </label>
                        <input
                            type="number"
                            value={startYear}
                            onChange={(e) => setStartYear(Number(e.target.value))}
                            min={1990}
                            max={2020}
                            className="w-full p-2 rounded-md text-black"
                            required
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-[rgba(0,0,0,0.6)] font-medium mb-1">
                            <FaCalendarAlt className="text-[rgba(0,0,0,0.6)]" />
                            End Year
                        </label>
                        <input
                            type="number"
                            value={endYear}
                            onChange={(e) => setEndYear(Number(e.target.value))}
                            min={1990}
                            max={2020}
                            className="w-full p-2 rounded-md text-black"
                            required
                        />
                    </div>
                </div>

                {error && <p className="text-red-300 font-semibold">{error}</p>}

                <div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 rounded-md transition"
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Analyze Heatwaves"}
                    </button>
                </div>
            </form>

            {data && (
                <div className="mt-10">
                    <SummaryBox percentChange={data.percent_change} startYear={startYear} />
                    <ChartDisplay summary={data.summary} />
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={() => exportCSV(data.summary)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                        >
                            Export CSV
                        </button>
                        <button
                            onClick={() => exportPDF(data.summary)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                        >
                            Export PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
