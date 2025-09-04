
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os

app = Flask(__name__, static_folder=".")
CORS(app)  # <-- active CORS

API_KEY = os.getenv("API_KEY")

@app.route("/")
def index():
    return send_from_directory(".", "Affiche météo.html")

@app.route("/weather")
def weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "Ville manquante"}), 400

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=fr"
    r = requests.get(url)
    return jsonify(r.json())

if __name__ == "__main__":
    app.run(debug=True)

