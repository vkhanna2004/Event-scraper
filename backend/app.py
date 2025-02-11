from flask import Flask, jsonify, request
from event_scraper import scrape_events
from threading import Thread
from flask_cors import CORS
from pymongo import MongoClient  
import os

MONGO_URI = os.getenv("MONGO_URI")  
PER_PAGE = 20

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/')
def hello_world():
    return 'Event Scraper is running!'

@app.route('/events')
def get_events():
    try:
        client = MongoClient(MONGO_URI)
        db = client.get_database("event-scraper")
        collection = db.events
        
        page = request.args.get("page", default=1, type=int)
        per_page = request.args.get("limit", default=PER_PAGE, type=int)
        skip = (page - 1) * per_page

        events = list(collection.find({}, {"_id": 0}).skip(skip).limit(per_page))
        total_events = collection.count_documents({}) 
        
        client.close()

        return jsonify({
            "events": events,
            "total": total_events,
            "page": page,
            "per_page": per_page,
            "total_pages": (total_events + per_page - 1) // per_page,  
        })
    except Exception as e:
        return jsonify({"message": "Error fetching events", "error": str(e)}), 500


@app.route('/scrape')
def scrape_events_route():
    try:
        thread = Thread(target=scrape_events)
        thread.start()
        return jsonify({"message": "Scraping started!"})
    except Exception as e:
        return jsonify({"message": "Error starting scraping", "error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
