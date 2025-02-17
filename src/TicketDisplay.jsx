import { useEffect, useState, useRef } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import "./TicketDisplay.css"; // Import the CSS file

const TicketDisplay = () => {
  const [ticket, setTicket] = useState(null);
  const ticketRef = useRef(null);

  useEffect(() => {
    const savedTicket = JSON.parse(localStorage.getItem("ticketData"));
    const savedFormData = JSON.parse(localStorage.getItem("formData"));

    if (savedTicket && savedFormData) {
      setTicket({
        ...savedTicket,
        ...savedFormData,
      });
    }
  }, []);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      useCORS: true,
      allowTaint: true,
    });
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, "TechFest_Ticket.png");
      }
    });
  };

  if (!ticket) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  const { fullName, email, avatarBase64, ticketType, ticketCount, ticketAccess, ticketPrice, specialRequest } = ticket;

  return (
    <div className="container">
      <div className="display-ticket">
        <div className="header">
          <h2>Ready</h2>
          <p className="step-indicator">Step 3/3</p>
        </div>
        <hr className="step-percent" />
        <div className="ticket-header">
          <h2>Your Ticket is Booked!</h2>
          <p>Check your email for a copy or you can download</p>
        </div>

        <div className="ticket-card" ref={ticketRef}>
          <h2 className="event-name">Techember Fest '25</h2>
          <p className="event-location">📍 04 Rumens road, Ikoyi, Lagos</p>
          <p className="event-date">📅 March 15, 2025 | 7:00 PM</p>

          {avatarBase64 && (
            <div className="avatar-section">
              <img src={avatarBase64} alt="User Avatar" className="avatar-image" />
            </div>
          )}

          <div className="ticket-details">
            <div className="ticket-dill">
              <div className="tic">
                <div className="ticc tic-1">
                  <div className="ticket-info tic-1-1">
                    <h4>Enter your name</h4>
                    <p className="answer">{fullName}</p>
                  </div>

                  <div className="ticket-info">
                    <h4>Enter your email *</h4>
                    <p className="answer">{email}</p>
                  </div>
                </div>
              </div>

              <div className="tic">
                <div className="ticc tic-2">
                  <div className="ticket-info">
                    <h4>Ticket type:</h4>
                    <p className="answer">{ticketAccess}</p>
                  </div>
                  <div className="ticket-info">
                    <h4>Ticket for:</h4>
                    <p className="answer">{ticketCount}</p>
                  </div>
                </div>
                
              </div>
            </div>
            <div>
              <h4>Special Request?</h4>
              <p>{specialRequest || "None"}</p>
            </div>
          </div>
          <div className="barcode">
            <img src="https://res.cloudinary.com/def9quyti/image/upload/v1739803940/Bar_Code_in6v8u.png" 
             alt="barcode" />
          </div>
        </div>

        <div className="buttons">
          <button className="book-another" onClick={() => window.location.href = '/'}>
            Book Another Ticket
          </button>
          <button className="download-ticket" onClick={downloadTicket}>
            Download Ticket as Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;
