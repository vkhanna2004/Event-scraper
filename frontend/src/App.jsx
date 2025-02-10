import React from "react";
import Events from "./components/Events.jsx";

function App() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#F3F4F6" }}>
      
      <header className="w-full bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
  
          <h1 className="text-2xl font-bold" style={{ color: "#1E3A8A" }}>
            Event Scraper
          </h1>

          <nav className="space-x-6">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">About</a>
            <a href="hhttps://github.com/vkhanna2004/Event-scraper" 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-4 py-2 rounded-lg font-semibold transition"
               style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}>
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center p-6">
        <h1 className="text-5xl font-bold mb-4" style={{ color: "#1E3A8A" }}>
          Event Scraper
        </h1>

        <p className="text-lg text-center max-w-2xl mb-4" style={{ color: "#4B5563" }}>
          Event Scraper is an automated tool that scrapes and displays upcoming events 
          from EventBrite, making it easy to stay updated on new events.
        </p>

        <a
          href="https://github.com/vkhanna2004/Event-scraper"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-lg font-semibold transition"
          style={{
            backgroundColor: "#10B981", 
            color: "#FFFFFF",
            textDecoration: "none",
          }}
        >
          View on GitHub
        </a>

        <div className="mt-10 w-full">
          <Events />
        </div>
      </main>
    </div>
  );
}

export default App;
