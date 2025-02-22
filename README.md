# Event Scraper (Flask + React)

A web application that scrapes events happening in Delhi NCR, India , making it easy to stay updated on new events.

## 🚀 Deployment
- You can Visit website [here](https://event-scraper-frontend.onrender.com/).
## 🚀 Features

✅ **Scrapes event details** details like title, date, location, description, ticket link, etc from Eventbrite  
✅ **Stores scraped events** in MongoDB Atlas  
✅ **React frontend** to display event listings  
✅ **Flask API** for backend communication
✅ **OTP Verification**: Secure event access via email OTP verification.
✅ **Redis Caching**: OTPs are stored in Redis for efficient verification.
✅ **Email Delivery via RESEND**: OTPs are sent using RESEND for reliable email deliver

## 📌 Tech Stack

- **Backend:** Flask, BeautifulSoup, Requests, PyMongo,Redis (for caching OTPs), RESEND (for sending OTP emails)
- **Database:** MongoDB Atlas (Cloud)
- **Frontend:** React (Vite)


## 📦 Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/vkhanna2004/Event-scraper.git
cd event-scraper
```
### 2. Backend Setup (Flask)
```
cd backend
```
📌 Create a virtual environment
```
python -m venv venv
```
📌 Install Python Dependencies
```
pip install -r requirements.txt
```
📌 Setup .env file for MongoDB

Create a .env file inside backend/:
```
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/event-scraper?retryWrites=true&w=majority
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
RESEND_API_KEY=
SENDER_MAIL_ID
```
📌 Run the Backend
```
python app.py
```
Backend will start on http://127.0.0.1:5000

### 3. Frontend Setup (React + Vite)

📌 Install Node.js Dependencies
```
cd frontend
npm install
```
📌 Setup .env file for React

Inside frontend/, create a .env file:
```
API_BASE_URL=http://127.0.0.1:5000
```
📌 Start the React App
```
npm run dev
```
Frontend will run on http://localhost:5173

🌍 API Endpoints (Flask)

| Method | Endpoint      | Description                  |
|--------|---------------|----------------------------- |
| GET    | `/api/events` | Get all events               |
| POST   | `/api/scrape` | Trigger scraping manually    |
| POST   | `/send-otp`   |Sends OTP to the user's email |
| POST   |`/verify-otp`  | Verifies OTP from Redis      |

📜 License

This project is MIT Licensed. Feel free to use and improve it! 🎉
________________________________________
🤝 Contributing
1.	Fork the repository
2.	Create a new branch (feature-branch)
3.	Commit changes
4.	Submit a Pull Request 🚀
