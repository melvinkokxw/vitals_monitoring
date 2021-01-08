import csv
import os
from datetime import datetime

from flask import Blueprint, request

# Blueprint Configuration
api_bp = Blueprint(
    "api_bp", __name__,
)


@api_bp.route("/ingest", methods=["GET"])
def ingest():
    """Route to ingest data"""
    now = datetime.now().strftime("%d-%m-%Y %H:%M:%S.%f")
    now_hour = datetime.now().strftime("%d-%m-%Y-%H")
    patient_id = request.args.get("PatientID", default = 0, type = int)
    heart_rate = request.args.get("hr", default = 1, type = int)
    temperature = request.args.get("temp", default = 1, type = float)

    fields=[now,patient_id,heart_rate, temperature]
    filename = f"{now_hour}.csv"

    if os.path.exists(filename):
        append_write = "a"
    else:
        append_write = "w"

    with open(filename, append_write) as f:
        writer = csv.writer(f)
        writer.writerow(fields)

    return {"msg": "Created Successfully"}, 201

@api_bp.route("/api", methods=["GET"])
def api():
    n=request.args.get("count", default = 60, type = int)
    now_hour = datetime.now().strftime("%d-%m-%Y-%H")
    filename = f"{now_hour}.csv"

    with open(filename, "r") as f:
        reader = csv.reader(f,delimiter = ",")
        data = list(reader)
        row_count = len(data)
    
    data = data[row_count-n:]
    
    response = {
        "timestamp": column(data, 0),
        "patient_id": column(data, 1),
        "hr": column(data, 2),
        "temp": column(data, 3)
    }

    return response

def column(matrix, i):
    return [row[i] for row in matrix]