from flask import Flask, jsonify
from event_scraper import scrape_events
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

if __name__ == '__main__':
    app.run(debug=True)
