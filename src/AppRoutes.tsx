import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase";

import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      {location.pathname !== "/" && <Header user={user} />}

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </>
  );
};

export default AppRoutes;
