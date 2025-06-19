# 🍞 Breadcrumb

Breadcrumb is an interactive travel map web application that lets users track the countries they’ve visited. It provides a personalized, visual experience where users can log in, click on countries to mark them as visited, and see their travel history come to life.

## 🚀 Features

### ✅ Interactive World Map

- Displays a full world map using **React Leaflet** and **GeoJSON** data.
- Users can **click on a country** to toggle its visited state (highlighted in blue).
- Tooltips show the country names on hover.

### ✅ User Authentication

- Implemented via **Firebase Authentication** with support for login and signup.
- Each user’s visited countries are saved and retrieved from the **Firestore database**.

### ✅ Visited Country Persistence

- When logged in, visited countries are **automatically fetched** from Firestore.
- Clicking on a country updates the map and **saves the change to the database**.

### ✅ Responsive Layout

- Clean and minimal design styled with **TailwindCSS**.
- The dashboard layout splits the screen between the interactive map and a sidebar.

## 🔧 Tech Stack

- **React (TypeScript)**
- **React Leaflet** for map rendering
- **Firebase** (Authentication + Firestore)
- **TailwindCSS** for styling
- **Netlify** for deployment

## 🌐 Live URL

- 🔗 **App:** [https://breadcrumb-mhserrao.netlify.app](https://breadcrumb-mhserrao.netlify.app)
- 🔗 **Embedded in Portfolio:** [https://mhserrao.dev/breadcrumb](https://mhserrao.dev/breadcrumb)

## 📁 Project Structure (simplified)

src/
│
├── auth/
│ └── firebase.ts # Firebase config and auth exports
│
├── components/
│ ├── Header.tsx # App header with login/signup links
│ ├── MapChart.tsx # Interactive map component
│ └── VisitedList.tsx # (Optional) Sidebar list of visited countries
│
├── db/
│ └── firestorehelper.ts # Firestore helpers for saving countries
│
├── pages/
│ ├── Dashboard.tsx # Main map dashboard
│ └── Home.tsx # Landing page with hero and CTA
│
├── App.tsx # Routing wrapper
├── AppRoutes.tsx # All defined routes
└── index.tsx # Entry point

---

## 🛠️ Setup Instructions

Follow these steps to run the Breadcrumb app locally:

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/breadcrumb.git
cd breadcrumb
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Add Environment Variables**

Create a `.env` file in the root of the project with the following Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit this `.env` file to version control (it's already in `.gitignore` by default).

### 4. **Start the Development Server**

```bash
npm start
```

Your app will run on [http://localhost:3000](http://localhost:3000)

---

## 📦 Tech Stack

- React + TypeScript
- Leaflet.js
- Firebase Auth & Firestore
- TailwindCSS

---

## 🧩 Upcoming Features

- Save countries users want to visit
- Display list of countries by continent
- Travel stats (e.g., % of world visited)
- Social sharing features
