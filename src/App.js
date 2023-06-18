import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Food from "./pages/Food";
import FoodIntro from "./pages/FoodIntro";
import { Route, Routes } from "react-router-dom";

  
const App = () => {

  return (
    <div className="app-container">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/food">
          <Route index element={<Food/>}/>
          <Route path="/food/:id" element={<FoodIntro/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
