from pydantic import BaseModel
from typing import Dict, Any

class HeatwaveSummary(BaseModel):
    summary: Dict[str, Dict[str, Any]]
    percent_change: float

class RegionRequest(BaseModel):
    lat: float
    lon: float
    start_year: int
    end_year: int

class WelcomeMessage(BaseModel):
    message: str