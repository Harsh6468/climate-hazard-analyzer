from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGO_URI)
db = client["climate_db"]
collection = db["heatwave_summary"]

def cache_summary(region_key, summary):
    collection.update_one(
        {"region_key": region_key},
        {"$set": {"summary": summary}},
        upsert=True
    )

def get_cached_summary(region_key):
    result = collection.find_one({"region_key": region_key})
    if result:
        return result["summary"]
    return None
