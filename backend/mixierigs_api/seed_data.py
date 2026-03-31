SEED_RIGS = [
    {"_id": "neptune",  "name": "Neptune Star",  "type": "floater", "area": "GoM",     "status": "DRILLING", "alarms": 2, "depth": "14,382 ft WD 4,820 ft", "dot": "amber", "customer": "shell"},
    {"_id": "titan",    "name": "Titan Deep",     "type": "floater", "area": "GoM",     "status": "DRILLING", "alarms": 3, "depth": "8,200 ft WD",            "dot": "red",   "customer": "shell"},
    {"_id": "atlas",    "name": "Atlas JU-47",    "type": "jackup",  "area": "GoM",     "status": "DRILLING", "alarms": 0, "depth": "312 ft WD",              "dot": "green", "customer": "mobil"},
    {"_id": "valiant",  "name": "Valiant NS-12",  "type": "jackup",  "area": "NS",      "status": "DRILLING", "alarms": 0, "depth": "210 ft WD",              "dot": "green", "customer": "mobil"},
    {"_id": "pioneer",  "name": "Pioneer NS-7",   "type": "jackup",  "area": "NS",      "status": "DRILLING", "alarms": 1, "depth": "190 ft WD",              "dot": "amber", "customer": "chevron"},
    {"_id": "ranger1",  "name": "Ranger 1",       "type": "land",    "area": "Permian", "status": "DRILLING", "alarms": 0, "depth": "9,400 ft MD",            "dot": "green", "customer": "texoil"},
    {"_id": "ranger2",  "name": "Ranger 2",       "type": "land",    "area": "Permian", "status": "DRILLING", "alarms": 0, "depth": "11,200 ft MD",           "dot": "green", "customer": "texoil"},
    {"_id": "ranger3",  "name": "Ranger 3",       "type": "land",    "area": "Permian", "status": "DRILLING", "alarms": 1, "depth": "6,800 ft MD",            "dot": "amber", "customer": "texoil"},
]

SEED_ALERTS = [
    {"_id": "a1", "rigId": "titan",   "rigName": "Titan Deep",    "severity": "critical", "system": "Well Control",     "message": "Pit Gain +2.4 bbl",           "time": "00:03:21", "acknowledged": False},
    {"_id": "a2", "rigId": "titan",   "rigName": "Titan Deep",    "severity": "critical", "system": "F&G Safety",       "message": "Gas 18% LEL Zone-3A",         "time": "00:03:21", "acknowledged": False},
    {"_id": "a3", "rigId": "titan",   "rigName": "Titan Deep",    "severity": "critical", "system": "Mud/Circulation",  "message": "Standpipe 4,120 psi",         "time": "00:03:21", "acknowledged": False},
    {"_id": "a4", "rigId": "neptune", "rigName": "Neptune Star",  "severity": "critical", "system": "Marine/DP",        "message": "DP Wind Advisory 38kt NW",    "time": "00:11:44", "acknowledged": False},
    {"_id": "a5", "rigId": "neptune", "rigName": "Neptune Star",  "severity": "warning",  "system": "Equip Health",     "message": "Pump 2 Vibration 4.8mm/s",   "time": "00:22:10", "acknowledged": False},
    {"_id": "a6", "rigId": "pioneer", "rigName": "Pioneer NS-7",  "severity": "warning",  "system": "Jacking",          "message": "Leg C Load Imbalance 8.4%",  "time": "01:04:33", "acknowledged": False},
    {"_id": "a7", "rigId": "ranger3", "rigName": "Ranger 3",      "severity": "warning",  "system": "F&G Safety",       "message": "H2S 3.2 ppm at Shaker",      "time": "00:45:18", "acknowledged": False},
]
