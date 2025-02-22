import React, { useState } from "react";
import { sendOTP, verifyOTP } from "../services/api.js";

const Otp = ({ event, isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen || !event) return null; // Don't render if modal is closed

  const handleSendOTP = async () => {
    try {
      const response = await sendOTP(email);
      setMessage(response.message || response.error);
    } catch (error) {
      setMessage("Failed to send OTP.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await verifyOTP(email, otp);
      if (response.message) {
        window.location.href = event.link; // Redirect to event url
      } else {
        setMessage(response.error);
      }
    } catch (error) {
      setMessage("Failed to verify OTP.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h3 className="text-lg font-semibold mb-4 text-center">
          Enter Email to View Event
        </h3>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          onClick={handleSendOTP}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
        >
          Send OTP
        </button>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          onClick={handleVerifyOTP}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Verify OTP
        </button>

        {message && <p className="text-red-500 mt-3 text-center">{message}</p>}

      </div>
    </div>
  );
};

export default Otp;
