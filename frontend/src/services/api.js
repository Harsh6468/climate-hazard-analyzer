import axios from "axios";

// const BACKEND_URL = "http://localhost:8000/api/v1/heatwave";
const BACKEND_URL = "https://climate-hazard-analyzer.onrender.com/api/v1/heatwave";

export async function fetchHeatwaveData(location, lat, lon, startYear, endYear) {
    const params = {
        start_year: startYear,
        end_year: endYear,
    };
    if (location) {
        params.location = location;
    } else if (lat && lon) {
        params.lat = lat;
        params.lon = lon;
    }

    const response = await axios.get(`${BACKEND_URL}`, { params });
    return response.data;
}