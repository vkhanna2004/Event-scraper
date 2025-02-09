import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import pandas as pd 

# Load environment variables from .env
load_dotenv()

# MongoDB connection setup
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client['event-scraper']
events_collection = db['events']

# URL of the event page to scrape
EVENT_URL = "https://www.eventbrite.com/d/india--delhi/events/"  

# Scrape events from the website
def scrape_events():
    response = requests.get(EVENT_URL)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Example scraping logic - You need to adjust based on the structure of the website you're scraping
        events = soup.find_all('div', class_='event-card')  # Adjust based on actual HTML

        for event in events:
            title = event.find('h2').get_text(strip=True)
            description = event.find('p').get_text(strip=True)
            link = event.find('a', href=True)['href']
            
            # Prepare the event data
            event_data = {
                'title': title,
                'description': description,
                'link': link,
                'scraped_at': pd.Timestamp.now()  # Ensure correct import and usage
            }
            
            # Insert event data into MongoDB
            events_collection.insert_one(event_data)
            print(f"Scraped and saved: {title}")
    else:
        print("Failed to retrieve events")

# Run the scraper
if __name__ == "__main__":
    scrape_events()
