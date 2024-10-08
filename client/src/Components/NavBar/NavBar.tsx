import React from "react";
import { useAuth } from "../../Contexts/useAuth";

type Props = {};

const NavBar = (props: Props) => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="tel:5541251234"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              (555) 412-1234
            </a>
            {!isLoggedIn() ? (
              <>
                <a
                  href="login"
                  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Login
                </a>
                <a
                  href="register"
                  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Signup
                </a>
              </>
            ) : (
              <a
                href="/"
                onClick={(e) => {
                  logout();
                }}
                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Logout
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
