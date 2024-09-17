import { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "../helpers/declarations";
import { useNavigate } from "react-router";
import { Login, Register } from "../Services/AuthService";
import { showErrorModal, showSuccessModal } from "../helpers/handlers";
import React from "react";
import axios from "axios";
type UserContextType = {
  token: string | null;
  RegisterUser: (
    email: string,
    userName: string,
    password: string,
    role: string
  ) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};
type Props = { children: React.ReactNode };
const AuthContext = createContext<UserContextType>({} as UserContextType);
export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, []);
  const RegisterUser = async (
    email: string,
    userName: string,
    password: string,
    role: string
  ) => {
    await Register(email, userName, password, role).then(
      (response) => {
        localStorage.setItem("token", response.accessToken);
        showSuccessModal();
        navigate("/");
      },
      (error) => {
        showErrorModal();
      }
    );
  };
  const login = async (userName: string, password: string) => {
    await Login(userName, password).then(
      (response) => {
        localStorage.setItem("token", response.accessToken);
        showSuccessModal();
        navigate("/");
      },
      (error) => {
        showErrorModal();
      }
    );
  };
  const isLoggedIn = () => {
    return !!token;
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{ token, RegisterUser, login, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
