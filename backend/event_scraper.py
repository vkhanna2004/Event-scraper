import os
import json
from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

EVENT_URL = "https://www.eventbrite.com/d/india--delhi/events/"  
MONGO_URI = os.getenv("MONGO_URI")

def scrape_events():
    base_dir = os.path.dirname(__file__)
    
    html_content = requests.get(EVENT_URL)
    if html_content.status_code == 200:
        soup = BeautifulSoup(html_content.text, 'html.parser')
    else:
        print("Failed to retrieve events")
        return

    # Update the selector based on the actual HTML structure.
    events_elements = soup.find_all('div', class_='event-card')
    events = []
    
    for elem in events_elements:
        image_tag = elem.find('img', src=True)
        title_tag = elem.find('h3')
        description_tag = elem.find('p')
        link_tag = elem.find('a', href=True)
        
        title = title_tag.get_text(strip=True) if title_tag else 'No title'
        description = description_tag.get_text(strip=True) if description_tag else 'No description'
        link = link_tag['href'] if link_tag else 'No link'
        
        event_data = {
            'image': image_tag['src'] if image_tag else 'No image',
            'title': title,
            'description': description,
            'link': link,
        }
        events.append(event_data)
    
    client = MongoClient(MONGO_URI)
    db = client.get_default_database()
    collection = db.events  # using collection named 'events'
    
    # Remove all existing documents
    delete_result = collection.delete_many({})
    print(f"Deleted {delete_result.deleted_count} documents from the collection.")
    
    # Insert into mongoDB
    if events:
        insert_result = collection.insert_many(events)
        print(f"Inserted {len(insert_result.inserted_ids)} events into MongoDB.")
    else:
        print("No events found to insert.")
    
    client.close()

if __name__ == "__main__":
    scrape_events()