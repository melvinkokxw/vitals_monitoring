import csv
import os
from datetime import datetime

from flask import Blueprint
from flask import current_app as app
from flask import render_template, request

# Blueprint Configuration
ingest_bp = Blueprint(
    "ingest_bp", __name__,
)


@ingest_bp.route("/", methods=["GET"])
def home():
    """Route to POST data into"""
    now = datetime.now().strftime("%d-%m-%Y %H:%M:%S.%f")
    now_hour = datetime.now().strftime("%d-%m-%Y-%H")
    heart_rate = request.args.get("hr", default = 1, type = int)
    temperature = request.args.get("temp", default = 1, type = float)

    fields=[now,heart_rate, temperature]
    filename = f"{now_hour}.csv"

    if os.path.exists(filename):
        append_write = "a"
    else:
        append_write = "w"

    with open(filename, append_write) as f:
        writer = csv.writer(f)
        writer.writerow(fields)

    return None
