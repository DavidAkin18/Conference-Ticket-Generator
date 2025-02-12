import { useEffect, useState, useRef } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

const TicketDisplay = () => {
  const [ticket, setTicket] = useState(null);
  const ticketRef = useRef(null);

  useEffect(() => {
    const savedTicket = JSON.parse(localStorage.getItem("ticketData"));
    setTicket(savedTicket);
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

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-900 text-white">
      {ticket && (
        <div ref={ticketRef} className="relative p-6 bg-gray-800 rounded-3xl border border-teal-400 shadow-lg w-[350px] text-center">
          <h2 className="text-xl font-bold text-teal-300">HNG Fest "12</h2>
          <p className="text-gray-400 text-sm mt-1">📍 Abuja, Ikorodu road, Lagos</p>
          <p className="text-gray-400 text-sm">📅 Feb 15, 2025 | 1:00 PM</p>

          {/* User Avatar */}
          {ticket.avatarUrl && (
            <div className="flex justify-center mt-4">
              <img
                src={ticket.avatarUrl || ticket.avatarFile}
                alt="User Avatar"
                className="w-24 h-24 rounded-lg border-2 border-teal-300"
              />
            </div>
          )}

          
          <div className="mt-4 bg-gray-700 p-4 rounded-lg text-left text-sm space-y-2">
            <p className="text-white font-semibold">🎟 Name: <span className="text-gray-300">{ticket.fullName}</span></p>
            <p className="text-white font-semibold">📧 Email: <span className="text-gray-300">{ticket.email}</span></p>
            <p className="text-white font-semibold">🎫 Ticket Type: <span className="text-gray-300">{ticket.ticketType}</span></p>
            <p className="text-white font-semibold">#️⃣ Quantity: <span className="text-gray-300">{ticket.ticketAmount}</span></p>
          </div>

         
        </div>
      )}

      {ticket && (
        <button 
          onClick={downloadTicket} 
          className="mt-6 bg-teal-500 px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition">
          Download Ticket as Image
        </button>
      )}
    </div>
  );
};

export default TicketDisplay;
