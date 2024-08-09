"use client";
import axios from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useJwt } from "react-jwt";
const authContext = createContext();

const LoginContext = ({ children }) => {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(initialState);
  const [user, setUser] = useState(null);
  const [isLoged, setIsLoged] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  // const { decodedToken, isExpired } = useJwt(token);
  // console.log(decodedToken, isExpired);

  console.log(user);
  console.log(token);
  console.log(isLoged);
  console.log(loginData);

  const handleLogin = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setLoginData({ ...loginData, [name]: value });
  };

  const logOut = () => {
    setUser(null);
    setIsLoged(false);
    localStorage.removeItem("userData");

    router.push("/");
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("userData");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/game/users/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.status !== 200) {
        setIsLoged(false);
        setUser(null);
        router.replace("/");
      }
      if ((response.status === 200)) {
        setIsLoged(true);
        setUser(response.data);
        setToken(response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));
        router.replace("/form");
      }
    } catch (error) {
      if (error.response?.data === "Wrong pass") {
        setError("Wrong Pass");
      }
      console.log(error?.response);
    }
  };

  return (
    <authContext.Provider
      value={{
        handleLogin,
        handleSubmit,
        isLoged,
        loginData,
        user,
        error,
        logOut,
        token,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default LoginContext;

export const useLoginContext = () => useContext(authContext);
