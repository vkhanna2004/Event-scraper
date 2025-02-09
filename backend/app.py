from flask import Flask, jsonify
from event_scraper import scrape_events  # Import the scraper
from threading import Thread

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Event Scraper is running!'

@app.route('/scrape')
def scrape_events_route():
    # Run the scraper in a separate thread
    thread = Thread(target=scrape_events)
    thread.start()
    return jsonify({"message": "Scraping started!"})

@app.route('/events')
def get_events():
    # Placeholder to retrieve events from DB, adjust as needed
    events = list(events_collection.find())
    return jsonify(events)

if __name__ == '__main__':
    app.run(debug=True)
