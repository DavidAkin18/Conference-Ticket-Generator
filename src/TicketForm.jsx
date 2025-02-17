import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TicketForm.css"; // Import the CSS file

const TicketForm = () => {
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  const ticketOptions = [
    { id: 1, type: "Free", price: 0, access: "REGULAR ACCESS", availability: "20/52" },
    { id: 2, type: "$150", price: 150, access: "VIP ACCESS", availability: "20/52" },
    { id: 3, type: "$200", price: 200, access: "VVIP ACCESS", availability: "20/52" },
  ];

  const handleNext = () => {
    // Get the full ticket details based on the selected ticket id
    const selectedTicketDetails = ticketOptions.find(ticket => ticket.id === selectedTicket);

    // Save the selected ticket and ticket count to localStorage
    const ticketData = { 
      ticketType: selectedTicketDetails.type, 
      ticketAccess: selectedTicketDetails.access,
      ticketPrice: selectedTicketDetails.price,
      ticketCount
    };
    
    localStorage.setItem("ticketData", JSON.stringify(ticketData));
    navigate("/ticket-selection");
  };

  return (
    <div className="ticket-fetch-container">
      <div className="ticket-card">
        <div className="header">
          <h2>Ticket Selection</h2>
          <p className="step-indicator">Step 1/3</p>
        </div>
        <hr className="step-percent"/>
        <div className="ticket-card-main">
          <div className="event-info">
            <h1 className="event-title"><i>Techember Fest '25</i></h1>
            <p>Join us for an unforgettable experience at <b>[Event Name]</b>! Secure your spot now.</p>
            <p className="event-details">
              📍 <b>[Event Location]</b> || March 15, 2025 | 7:00 PM
            </p>
          </div>
          <hr className="hr"/>
          <div className="ticket-selection">
            <h3>Select Ticket Type:</h3>
            <div className="ticket-options">
              {ticketOptions.map((ticket) => (
                <button
                  key={ticket.id}
                  className={`ticket-button ${selectedTicket === ticket.id ? "selected" : ""}`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <span className="ticket-price">{ticket.type}</span>
                  <span className="ticket-access">{ticket.access}</span>
                  <span className="ticket-availability">{ticket.availability}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="ticket-count">
            <h3>Number of Tickets</h3>
            <select value={ticketCount} onChange={(e) => setTicketCount(e.target.value)} className="dropdown">
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
            <button
              className="next-button"
              disabled={!selectedTicket}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
