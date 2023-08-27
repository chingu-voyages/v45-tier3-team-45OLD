import Button from "../components/Button";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase_config";
import { useState, useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { name, logo_url } from "../constants/index";

function Landing() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setIsLoading(false);
      setUser(currentUser);
    });
  }, []);

  const onLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  if (isLoading) {
    return <PacmanLoader size={150} />;
  }

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <img className="h-28 w-auto" src={logo_url} alt="logo" />
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with friends and the world around you on Facebook.
            </p>
            {user === null ? (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button title="Log in" path="/login" />
                <Button title="sign up" path="/signup" />
              </div>
            ) : (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button title="Dashboard" path="/dashboard" />
                <Button title="log out" onClick={onLogout} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
