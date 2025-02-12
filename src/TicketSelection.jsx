import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TicketSelection = () => {
  const [ticketType, setTicketType] = useState("Regular");
  const [ticketAmount, setTicketAmount] = useState(1);
  const navigate = useNavigate();

  const ticketOptions = [
    { type: "Regular", price: "Free", availability: "10/52" },
    { type: "VIP", price: "$150", availability: "20/52" },
    { type: "VVIP", price: "$250", availability: "52/52" },
  ];

  const handleSelection = () => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    localStorage.setItem("ticketData", JSON.stringify({ ...formData, ticketType, ticketAmount }));
    navigate("/ticket-display");
  };

  return (
    <div className="flex flex-col items-center  lg:justify-center p-4 min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg  bg-gray-800  p-6 rounded-lg shadow-lg">
        {/* Event Banner */}
        <div className="bg-gray-700 p-4 rounded-md space-y-4 text-center">
          <h2 className="text-2xl font-bold text-white">HNG Fest "12</h2>
          <p className="text-gray-300 mt-2">
            Join us for an unforgettable experience at HNG! Secure your spot now.
          </p>
          <p className="text-gray-400 mt-2">📍 Abuja, Ikorodu road | 🗓 Feb 15, 2025 | 1:00 PM</p>
        </div>

        {/* Ticket Selection */}
        <h2 className="mt-6 text-lg font-semibold">Select Ticket Type:</h2>
        <div className="flex gap-4 mt-4 ">
          {ticketOptions.map((ticket) => (
            <div
              key={ticket.type}
              onClick={() => setTicketType(ticket.type)}
              className={`cursor-pointer p-2 md:p-4 rounded-lg w-full border ${
                ticketType === ticket.type ? "border-blue-500 bg-gray-700" : "border-gray-600"
              }`}
            >
              <h3 className="text-xl font-bold">{ticket.price}</h3>
              <p className="text-gray-300">{ticket.type} Access</p>
              <p className="text-sm text-gray-400">{ticket.availability}</p>
            </div>
          ))}
        </div>

        {/* Ticket Quantity */}
        <h2 className="mt-6 text-lg font-semibold ">Number of Tickets</h2>
        <select
          value={ticketAmount}
          onChange={(e) => setTicketAmount(e.target.value)}
          className="w-full mt-2 p-2 rounded bg-gray-700 text-white"
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Link to="/">
            <button className="bg-red-500 px-4 py-2 rounded-md">Cancel</button>
          </Link>
          <button onClick={handleSelection} className="bg-blue-600 px-6 py-2 rounded-md">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
