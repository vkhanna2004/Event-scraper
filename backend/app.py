from flask import Flask, jsonify, request, redirect
from event_scraper import scrape_events
from threading import Thread
from flask_cors import CORS
from pymongo import MongoClient  
import os
import redis
import resend
import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

SENDER_MAIL_ID=os.getenv("SENDER_MAIL_ID")

# //Database configuration
MONGO_URI = os.getenv("MONGO_URI")  
PER_PAGE = 20

# Redis Configuration
REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")

redis_client = redis.Redis(
    host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PASSWORD, decode_responses=True
)

# Resend Configuration
resend.api_key = os.environ["RESEND_API_KEY"]

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


@app.route("/send-otp", methods=["POST"])
def send_otp():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    otp = str(random.randint(100000, 999999))  #6-digit OTP

    # store otp in redis - expiry of 5 minutes
    redis_client.setex(email, 300, otp)

    # Send otp
    resend.Emails.send({
        "from": SENDER_MAIL_ID,
        "to": email,
        "subject": "Your OTP Code",
        # "text": f"Your OTP is {otp}. It will expire in 5 minutes."
        "text":f"""Hello,  

You requested access to view an event on Event-Scraper. Please use the following OTP to verify your email:  

Your OTP Code: {otp}  

This code will expire in 5 minutes. Please do not share it with anyone.  

Once verified, you can proceed to access your event details.  

About Event-Scraper: 
Event-Scraper helps you discover and track upcoming events easily. Check out the project on GitHub:  
 [GitHub Repository](https://github.com/vkhanna2004/Event-scraper)  

If you did not request this, you can ignore this email safely.  
"""
    })

    return jsonify({"message": "OTP sent successfully"}), 200


@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    email = data.get("email")
    otp = data.get("otp")

    if not email or not otp:
        return jsonify({"error": "Email and OTP are required"}), 400

    stored_otp = redis_client.get(email)

    if stored_otp and stored_otp == otp:
        redis_client.delete(email)  # Remove OTP after verification
        return jsonify({"message": "OTP verified successfully"}), 200
    else:
        return jsonify({"error": "Invalid or expired OTP"}), 400


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000,debug=True)
