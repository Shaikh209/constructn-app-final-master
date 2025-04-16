import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import "./SignupForm.css";

const SignupForm = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [residency, setResidency] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");
  const [otp, setOtp] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const navigateTo = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const getOtp = async (e) => {
    e.preventDefault();
    try {
      const responseOtp = await axios.post(
        "http://localhost:8765/user/client/register/otp",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("OTP Response:", responseOtp.data);
      toast.success(responseOtp.data.message);
    } catch (error) {
      console.error(
        "Error:",
        error.response?.data?.message || "An error occurred."
      );
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      otp,
      address: {
        residency,
        street,
        landmark,
        city,
        state,
        country,
        pincode,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8765/user/client/register",
        data,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      console.log(response);

      setIsAuthenticated(true);
      navigateTo("/");
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error occurred during registration:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="signup-container">
        <h2 className="signup-header">Client Registration</h2>
        {serverResponse && (
          <p
            className={`${
              serverResponse.includes("error")
                ? "error-message"
                : "success-message"
            }`}
          >
            {serverResponse}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">First Name</label>
          </div>

          <div className="signup-form-group">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">Last Name</label>
          </div>

          <div className="signup-form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">Email</label>
          </div>

          <div className="signup-form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">Password</label>
          </div>

          <h3 className="signup-address-header">Address</h3>
          <div className="signup-form-group">
            <input
              type="text"
              value={residency}
              onChange={(e) => setResidency(e.target.value)}
              className="input"
              placeholder=" "
            />
            <label className="signup-label">Residency</label>
          </div>

          <div className="signup-form-group-row">
            <div className="signup-form-group">
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="input"
                placeholder=" "
              />
              <label className="signup-label">Street</label>
            </div>

            <div className="signup-form-group">
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="input"
                placeholder=" "
              />
              <label className="label">Landmark</label>
            </div>
          </div>

          <div className="signup-form-group-row">
            <div className="signup-form-group">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input"
                placeholder=" "
              />
              <label className="signup-label">City</label>
            </div>

            <div className="signup-form-group">
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="input"
                placeholder=" "
              />
              <label className="signup-label">State</label>
            </div>
          </div>

          <div className="signup-form-group-row">
            <div className="signup-form-group">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input"
                placeholder=" "
              />
              <label className="signup-label">Country</label>
            </div>

            <div className="signup-form-group">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="input"
                placeholder=" "
              />
              <label className="signup-label">Pincode</label>
            </div>
          </div>

          <div className="signup-form-group-row">
            <div className="signup-form-group">
              <button type="button" onClick={getOtp} className="button">
                Get OTP
              </button>
            </div>

            <div className="signup-form-group">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input"
                placeholder=" "
              />
              <label className="signup-label">OTP</label>
            </div>
          </div>

          <button type="submit" className="button">
            Register
          </button>
        </form>

        <div className="register-link">
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
