import pandas as pd

from utils.open_meteo import fetch_weather_data
from db.mongo import cache_summary, get_cached_summary
from models.schemas import HeatwaveSummary

def get_heatwave_summary(lat: float, lon: float, start_year: int, end_year: int) -> HeatwaveSummary:
    region_key = f"{lat}-{lon}-{start_year}-{end_year}"

    cached = get_cached_summary(region_key)
    if cached:
        return HeatwaveSummary(**cached)

    df = fetch_weather_data(lat, lon, start_year, end_year)
    df["date"] = pd.to_datetime(df["date"])
    df["year"] = df["date"].dt.year

    percentile_95 = df["max_temp"].quantile(0.95)

    heatwave_days = df[df["max_temp"] > percentile_95].copy()
    heatwave_days["heatwave_group"] = (heatwave_days["date"].diff().dt.days > 1).cumsum()
    grouped = heatwave_days.groupby(["year", "heatwave_group"]).size().reset_index(name="duration")
    long_heatwaves = grouped[grouped["duration"] >= 3]

    yearly_summary = (
        long_heatwaves.groupby("year").agg(
            count=("duration", "count"),
            mean_duration=("duration", "mean")
        ).round(2).fillna(0)
    )

    summary_dict = {
        str(year): {
            "duration": {
                "count": int(row["count"]),
                "mean": float(row["mean_duration"])
            }
        }
        for year, row in yearly_summary.iterrows()
    }

    years = list(yearly_summary.index)
    if len(years) > 1:
        first = yearly_summary.iloc[0]["count"]
        last = yearly_summary.iloc[-1]["count"]
        percent_change = round(((last - first) / (first or 1)) * 100, 2)
    else:
        percent_change = 0.0

    final_summary = HeatwaveSummary(summary=summary_dict, percent_change=percent_change)
    cache_summary(region_key, final_summary.dict())
    return final_summary
