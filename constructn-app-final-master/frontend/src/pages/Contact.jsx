import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import contactAnimation from "../assets/contact-animation.json";
import "./Contact.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/contact/submit", formData);
      
      if (response.status === 200) {
        toast.success("Message sent successfully!", { position: "top-right" });
        setFormData({ name: "", email: "", message: "" }); // Clear form
      }
    } catch (error) {
      toast.error("Failed to send message. Try again later!", { position: "top-right" });
    }
  };

  return (
    <div>
      <header className="header" data-aos="fade-down">
        <div className="header-box container">
          <div className="logo">
            <Link to="/">Construction Machine Repair Service</Link>
          </div>
          <nav className="menu">
            <Link to="/" className="active">Home</Link>
            <Link to="/repair">Book Repair</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/profile">Profile</Link>
          </nav>
          <div className="btn-box">
            <Link to="/login" className="btn1">Login</Link>
          </div>
        </div>
      </header>

      <div className="repair-container">
        <div className="repair-content">
          <div className="repair-card">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />

              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

              <label>Message:</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Enter your message" required></textarea>

              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>

          <div className="lottie-animation">
            <Lottie animationData={contactAnimation} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
