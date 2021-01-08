import csv
import os
from datetime import datetime

from flask import Blueprint
from flask import render_template

# Blueprint Configuration
home_bp = Blueprint(
    "home_bp", __name__,
)


@home_bp.route("/", methods=["GET"])
def home():
    """Home page"""
    return render_template("index.html")
