import pandas as pd
import requests
from fastapi import HTTPException

def fetch_weather_data(lat, lon, start_year, end_year):
    url = "https://archive-api.open-meteo.com/v1/archive"
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": f"{start_year}-01-01",
        "end_date": f"{end_year}-12-31",
        # "start_year": start_year,
        # "end_year": end_year,
        "daily": "temperature_2m_max",
        "timezone": "auto"
    }
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        dates = data["daily"]["time"]
        temps = data["daily"]["temperature_2m_max"]
        df = pd.DataFrame({"date": dates, "max_temp": temps})
        return df
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Weather API timed out.")
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=503, detail="Error fetching weather data.")
