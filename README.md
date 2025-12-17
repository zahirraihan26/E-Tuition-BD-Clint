# 🎓 eTuitionBd – Tuition Management System

## 📌 Project Purpose
**eTuitionBd** is a full-stack Tuition Management System designed to connect **students, tutors, and admins** on a single platform.  
The system simplifies tuition posting, tutor applications, approvals, secure payments, and platform monitoring.

This project was built as part of a **technical assessment** to demonstrate real-world problem solving, role-based systems, and production-ready deployment.

---

## 🌐 Live Website
🔗 **Client Live URL:** https://lighthearted-croissant-f7f679.netlify.app/

---

## 👤 Admin Credentials (For Testing)
- **Email:** admin@email.com  
- **Password:** admin123  

---

## 🚀 Key Features

### 🔐 Authentication & Authorization
- Firebase Authentication (Email/Password)
- Google Login (Default role: Student)
- Role-based dashboards (Student / Tutor / Admin)
- JWT token verification (role, access, expiration)
- Protected routes (no redirect on reload)

---

## 🏠 Public Pages
- Home (Dynamic content + Framer Motion animations)
- Tuitions Listing (Search, Filter, Pagination)
- Tuition Details
- Tutor Listing
- Tutor Profile
- Login / Register
- Contact
- Custom 404 Error Page

---

## 🎯 Student Dashboard
- Post new tuition (Pending admin approval)
- Update tuition (default saved values shown)
- Delete tuition (confirmation popup)
- View applied tutors
- Approve tutor → Stripe payment
- Reject tutor applications
- Payment history
- Profile settings (name & photo update)

---

## 🧑‍🏫 Tutor Dashboard
- Apply for tuition (modal form)
- Track application status
- Update / delete application (until approved)
- View ongoing tuitions
- Revenue & transaction history

---

## 🛡️ Admin Dashboard
- User Management  
  - View users
  - Update profile info
  - Change roles (Student / Tutor / Admin)
  - Delete users
- Tuition Management  
  - Review tuition posts
  - Approve / Reject tuitions
- Reports & Analytics  
  - Total earnings
  - Transaction history
  - Charts & graphs (Recharts)

---

## 📊 Advanced Functionalities (Challenges)
- Search tuitions by subject & location
- Sort by budget & date
- Pagination (Tuition listing)
- Advanced filtering (class, subject, location)
- JWT verification (role & expiration)

---

## 💳 Payment System
- Stripe payment integration
- Tutor approval only after successful payment
- Secure transaction history
- Revenue tracking for tutors & admins

---

## 🎨 UI / UX Highlights
- Unique & polished UI (no module copy)
- DaisyUI + Tailwind CSS
- Fully responsive (mobile / tablet / desktop)
- Sticky navbar & dashboard sidebar
- Consistent button & heading styles
- Equal image sizing & clean spacing

---

## ⏳ Loading & Error Handling
- Full-screen loading spinner
- Friendly 404 error page
- No CORS / 404 / 504 issues in deployment

---

## 🛠️ Technologies Used

### Client Side
- React.js
- React Router DOM
- Tailwind CSS
- DaisyUI
- TanStack React Query
- Firebase Authentication
- Axios
- Framer Motion
- Recharts
- Stripe JS

### Server Side
- Node.js
- Express.js
- MongoDB
- JWT
- Stripe API
- dotenv
- CORS

---

## 🔐 Environment Variables

### Client (.env)
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_sender_id
VITE_appId=your_firebase_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
