# 🏗️ Construction Site Management System

A full-stack web application designed to manage daily operations on a construction site. It enables efficient communication, task management, and role-based access control for Admins, Site Managers, and Workers.

## 🔧 Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, OTP via Nodemailer

## 🚀 Features
- 🛡️ User authentication with OTP/email verification
- 👷 Role-based dashboards (Admin, Site Manager, Worker)
- 🛠️ Repair request submission and tracking
- 📩 Contact form with email notifications
- 📂 File uploads and secure route handling
- ❌ Centralized error handling middleware

## 📷 Screenshots
_Add screenshots here if available_

## 📁 Project Structure
- `client/` – React frontend
- `server/` – Node.js backend with Express routes and models

## 📬 Setup Instructions
```bash
# Clone the repo
git clone https://github.com/yourusername/construction-site-management.git
cd construction-site-management

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Run the app
npm start
