import { AnimatePresence } from "framer-motion";
import { createContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Adventures from "./pages/adventures/Adventures";
import AdventuresIntro from "./pages/adventures/AdventuresIntro";
import FineDining from "./pages/finedining/FineDining";
import FineDiningIntro  from "./pages/finedining/FineDiningIntro";
import Home from "./pages/Home";
import Food from "./pages/localdelights/Food";
import FoodIntro from "./pages/localdelights/FoodIntro";
import Login from "./pages/Login";

// import UserContext from "./UserContext";

import "./App.css";

const App = () => {
  // const [user, setUser] = useState("nobody");

  // const successfulLogin = (username) => {
  //   setUser(username);
  //   console.log(user);
  // }


  return (
    // <UserContext.Provider value={user}>
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
      // </UserContext.Provider>
  );
}

export default App;
