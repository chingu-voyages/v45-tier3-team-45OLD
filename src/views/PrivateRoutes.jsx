import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase_config";
import PacmanLoader from "react-spinners/PacmanLoader";

function PrivateRoutes() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setIsLoading(false);
      setUser(currentUser);
    });
  }, []);

  if (isLoading) {
    return <PacmanLoader size={150} />;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
