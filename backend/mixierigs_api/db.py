import os
from pymongo import MongoClient
from functools import lru_cache

@lru_cache(maxsize=1)
def get_db():
    uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    db  = os.getenv('MONGODB_DB',  'mixierigs')
    client = MongoClient(uri, serverSelectionTimeoutMS=3000)
    return client[db]

def seed_if_empty():
    """Seed MongoDB with demo data if collections are empty."""
    db = get_db()
    if db.rigs.count_documents({}) == 0:
        from mixierigs_api.seed_data import SEED_RIGS, SEED_ALERTS
        db.rigs.insert_many(SEED_RIGS)
        db.alerts.insert_many(SEED_ALERTS)
        print("✓ MongoDB seeded with demo data")
