import './App.css'
import Navbar from './assets/Navbar'
import { useState } from 'react'
import Events from "./pages/Events";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import EventBooking from './pages/EventBooking';
import Lander from './pages/Lander'

// Wrapper to conditionally show Navbar
const Layout = ({ isLoggedIn, setIsLoggedIn, children }) => {
  const location = useLocation();
  const hideNavbarOn = ["/"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && (
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {children}
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Routes>
          <Route path="/" element={<Lander />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/event/:id/edit" element={<Edit />} />
          <Route path="/createEvent" element={<Create />} />
          <Route path="/event/:id/booking" element={<EventBooking />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;