import Navbar from "./components/navbar/Navbar";
import Adventures from "./pages/adventures/Adventures";
import AdventuresIntro from "./pages/adventures/AdventuresIntro";
import FineDining from "./pages/finedining/FineDining";
import FineDiningIntro  from "./pages/finedining/FineDiningIntro";
import Home from "./pages/Home";
import Food from "./pages/localdelights/Food";
import FoodIntro from "./pages/localdelights/FoodIntro";
import Login from "./pages/Login";
import UserContext from "./UserContext";
import { AnimatePresence } from "framer-motion";
import jwt_decode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const decodedToken = jwt_decode(token);
        setToken(token);
        setUser(decodedToken.email);
        setIsAdmin(decodedToken.isAdmin);
      }
      console.log(token);
    } catch (error) {
      console.error('Error decoding the JWT token:', error);
    }
  }
  ,[isLoggedIn]);

  const logOutUser = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(null);
    setIsLoggedIn(false);
  }


  return (
    <UserContext.Provider value={{ user, token, isAdmin, isLoggedIn, setIsLoggedIn, logOutUser}}>
      <div className="app-container">
        <Navbar/>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Home/>}/>
            
            <Route path="/login" element={<Login/>}/>

            <Route path="/food">
              <Route index element={<Food/>}/>
              <Route path="/food/:id" element={<FoodIntro/>}/>
            </Route>

            <Route>
              <Route path="/fineDining" element={<FineDining/>}/>
              <Route path="/fineDining/:id" element={<FineDiningIntro/>}/>
            </Route>

            <Route>
              <Route path="/adventures" element={<Adventures/>}/>
              <Route path="/adventures/:id" element={<AdventuresIntro/>}/>
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </UserContext.Provider>
  );
}

export default App;
