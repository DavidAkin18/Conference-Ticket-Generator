import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketForm from "../src/TicketForm"
import TicketSelection from "../src/TicketSelection"
import TicketDisplayPage from "./TicketDisplay";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TicketForm/>} />
          <Route path='/ticket-selection' element={<TicketSelection/>}/>
          <Route path="/ticket-display" element={<TicketDisplayPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
