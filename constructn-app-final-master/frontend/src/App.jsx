import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swiper from "swiper";
import "./App.css";

import { Context } from "./main";
import Home from "./pages/Home";
import ContactUs from "./pages/Contact";
import ProfilePage from "./pages/ProfilePage";
import RepairRequestForm from "./components/RepairRequestForm";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8765/user/client/me", { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();

    AOS.init();
    new Swiper(".swiper", {
      autoplay: {
        delay: 2500,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
    });
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <div>
        {/* Header Section */}
        <header className="header" data-aos="fade-down">
          <div className="header-box container">
            <div className="logo">
              <Link to="/">Construction Machine Repair Service</Link>
            </div>
            <nav className="menu">
              <Link to="/">Home</Link>
              <Link to="/repair">Book Repair</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/profile">Profile</Link>
            </nav>
            <div className="btn-box">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="btn1">Login</Link>
                  <Link to="/signup" className="btn2">Sign Up</Link>
                </>
              ) : (
                <Link to="/profile" className="btn1">My Profile</Link>
              )}
            </div>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/repair' element={<RepairRequestForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>

        {/* Footer Section */}
        <footer>
          <div className="footerbox container">
            <div className="logo2">
              <Link to="/">Construction Machine Repair Service</Link>
            </div>
            <div className="f-menu">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/repair">Our Services</Link>
            </div>
            <p>Copyright © 2025-26 Technix</p>
          </div>
        </footer>
      </div>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
