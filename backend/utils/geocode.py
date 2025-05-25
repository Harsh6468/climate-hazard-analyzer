import requests
from fastapi import HTTPException

def get_coordinates_from_location(location: str):
    url = f"https://nominatim.openstreetmap.org/search"
    params = {"q": location, "format": "json", "limit": 1}
    headers = {"User-Agent": "climate-hazard-app"}
    try:
        response = requests.get(url, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        if not data:
            raise HTTPException(status_code=404, detail="Location not found.")
        return float(data[0]["lat"]), float(data[0]["lon"])
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Geocoding service timed out.")
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=503, detail="Error accessing geocoding service.")
