**ClarioBuddy** - A Centralized Student Utility Hub
ClarioBuddy is a centralized web platform designed to streamline essential campus services such as announcements, timetable updates, lost & found, complaints, and interactive polls. Built with a responsive and modern UI, it ensures students and admins can collaborate and communicate efficiently across a single hub.

**Tech Stack Used**
Area	Technology
Frontend	React.js
Backend	Firebase Functions
Database	Firebase Firestore
Auth	Firebase GoogleAuth
Deployment	Netlify

**Features**
Google Login for Students and Admins
Admin Announcement Posting 
Lost & Found Management
Timetable Uploads
Complaint Box with Admin View
Polls & Feedback (Student Voting System)

**Folder Structure**
src/
├── components/      # Reusable UI Components
├── pages/           # Home, Login, Dashboards (Admin & Student)
├── styles/          # All .css files (modular)
├── firebase.js      # Firebase Configuration
├── App.js           # Main Routing

**Team Members & Roles**
      Name	                           Role
Charan Madhav S       	Frontend Lead & Firebase Integration
Angelin Sharmell E	    Frontend Developer
Saravanakumar G	        GitHub Management & Netlify Deployment
Kanishka VJ	            Firestore Database Design

* Screenshots
(https://drive.google.com/drive/folders/1s5jxWtpz0YmXd2zv-I618ynvuflUuxg1?usp=drive_link)

**Setup Instructions**

  🔹 Prerequisites
Node.js & npm
Firebase CLI
Git

🔹 Frontend Setup (React)
bash
Copy
Edit
git clone [https://github.com/your-org/CampusLink.git](https://github.com/Saravanakumar2602/ClarioBuddy.git)
cd CampusLink
npm install

🔹 Firebase Setup
Create a Firebase project https://console.firebase.google.com
Enable Authentication > Google
Set up Cloud Firestore
Copy Firebase Config into .env file:
env
Copy
Edit
REACT_APP_FIREBASE_API_KEY=AIzaSyB2AwXbwCr5KqXftx--BCMVaQFTQfRxMkI
REACT_APP_FIREBASE_AUTH_DOMAIN=campuslink-844cd.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=campuslink-844cd
REACT_APP_FIREBASE_STORAGE_BUCKET=campuslink-844cd.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=159703839663
REACT_APP_FIREBASE_APP_ID=1:159703839663:web:1d9ddfbd7be9a78cb0f55a
REACT_APP_FIREBASE_MEASUREMENT_ID=G-WH7YY1ZKE6

🔹 Run Locally
bash
Copy
Edit
npm start

🔹 Deploy to Netlify
Push code to GitHub
Connect Netlify to GitHub repo
Set Build Command to: npm run build
Set Publish Directory to: build/
Add environment variables in Netlify dashboard

* Authentication & Firestore Rules
js
Copy
Edit
// Firestore (Basic example)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /announcements/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /lostFound/{docId} {
      allow read, write: if request.auth != null;
    }
    match /complaints/{docId} {
      allow create: if request.auth != null;
      allow delete, update: if request.auth.token.email == "admin_email";
    }
  }
}
Deployment
Frontend: React deployed on Netlify

Backend: Firebase Functions (Firestore + Auth)

Database: Firebase Firestore
