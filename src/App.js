import { AnimatePresence } from "framer-motion";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import ViewSubmissions from "./pages/adminview/ViewSubmissions";
import ViewSubmissionsIntro from "./pages/adminview/ViewSubmissionsIntro";
import Adventures from "./pages/adventures/Adventures";
import AdventuresIntro from "./pages/adventures/AdventuresIntro";
import FineDining from "./pages/finedining/FineDining";
import FineDiningIntro  from "./pages/finedining/FineDiningIntro";
import Home from "./pages/Home";
import Food from "./pages/localdelights/Food";
import Favourites from "./pages/Favourites";
import FoodIntro from "./pages/localdelights/FoodIntro";
import Login from "./pages/Login";
import UserContext from "./UserContext";

import "./App.css";

const refreshFavouritesAPI = async () => {
  try {
    const loginResponse = await fetch("http://localhost:3000/login/refresh", {
        method: "GET",
        headers: {
          "authorisation" : "Bringer " + localStorage.getItem("token")
        },
    })
    const res = await loginResponse.json();
    return res.favourites;
  } catch (error) {
    console.log(error);
  }
}

export { refreshFavouritesAPI };

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [hasChanges, setHasChanges] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    refreshFavouritesAPI().then(fav => localStorage.setItem("favourites", fav));
    const favourites = localStorage.getItem('favourites');
    try {
      if (token) {
        const decodedToken = jwt_decode(token);
        setToken(token);
        setUser(decodedToken.email);
        setIsAdmin(decodedToken.isAdmin);
        // const parsedFavourites = JSON.parse(favourites);
        // const favouritesMap = new Map(parsedFavourites.map(obj => [obj.key, obj.value]));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error decoding the JWT token:', error);
    }
  }, []);

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

            <Route path="/favourites" element={<Favourites/>}/>

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

            <Route>
              <Route path="/admin/submissions" element={<ViewSubmissions/>}/>
              <Route path="/admin/:id" element={<ViewSubmissionsIntro/>}/>
            </Route>

          </Routes>
        </AnimatePresence>
      </div>
    </UserContext.Provider>
  );
}

export default App;
