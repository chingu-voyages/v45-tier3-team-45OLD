import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import PacmanLoader from "react-spinners/PacmanLoader";
import { name, logo_url } from "../constants/index";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase_config";
import { getUserByEmail } from "../service/user";
import { removeUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
function Landing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  const onLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='bg-white'>
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav
          className='flex items-center justify-between p-6 lg:px-8'
          aria-label='Global'>
          <div className='flex lg:flex-1'>
            <img className='w-auto h-28' src={logo_url} alt='logo' />
          </div>
        </nav>
      </header>

      <div className='relative px-6 isolate pt-14 lg:px-8'>
        <div className='max-w-2xl py-32 mx-auto sm:py-48 lg:py-56'>
          <div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              {name}
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Connect with friends and the world around you on Facebook.
            </p>
            {!isAuthenticated ? (
              <div className='flex items-center justify-center mt-10 gap-x-6'>
                <Link
                  to='/login'
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  Log in
                </Link>
                <Link
                  to='/signup'
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  Sign up
                </Link>
              </div>
            ) : (
              <div className='flex items-center justify-center mt-10 gap-x-6'>
                <Link
                  to='/dashboard'
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  dashboard
                </Link>
                <div
                  onClick={onLogout}
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
