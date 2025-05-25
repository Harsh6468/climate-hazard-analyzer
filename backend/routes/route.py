from fastapi import APIRouter, HTTPException, Query

from services.weather_analyzer import get_heatwave_summary
from models.schemas import HeatwaveSummary, WelcomeMessage
from utils.geocode import get_coordinates_from_location

router = APIRouter()

@router.get("/", response_model=WelcomeMessage)
def welcome():
    return {"message": "Welcome to the Heatwave Summary API! Use the /heatwave endpoint to get heatwave data."}

@router.get("/api/v1/heatwave", response_model=HeatwaveSummary)
def heatwave_summary(
    location: str = Query(None, max_length=100),
    lat: float = Query(None, ge=-90, le=90),
    lon: float = Query(None, ge=-180, le=180),
    start_year: int = Query(1990, ge=1900, le=2100),
    end_year: int = Query(2020, ge=1900, le=2100),
):
    if location:
        lat, lon = get_coordinates_from_location(location.lower())
    elif lat is None or lon is None:
        raise HTTPException(status_code=400, detail="Either location or lat/lon must be provided.")
    
    if start_year > end_year:
        raise HTTPException(status_code=400, detail="start_year must be less than or equal to end_year.")

    return get_heatwave_summary(lat, lon, start_year, end_year)
