import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Food from "./pages/localdelights/Food";
import FineDining from "./pages/finedining/FineDining";
import FineDiningIntro  from "./pages/finedining/FineDiningIntro";
import Adventures from "./pages/adventures/Adventures";
import AdventuresIntro from "./pages/adventures/AdventuresIntro";
import FoodIntro from "./pages/localdelights/FoodIntro";
import Loading from "./components/Loading";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


  
const App = () => {
  const location = useLocation();
  const currPath = location.pathname;
  // const [isRefreshing, setIsRefreshing] = useState(false);

  // useEffect(() => {
  //   setIsRefreshing(true);
  //   console.log(currPath);
  //   const timer = setTimeout(() => {
  //     setIsRefreshing(false);
  //   }, 500);

  // }, [currPath]);

  // if (isRefreshing) {
  //   return <div><p>LOADING PLEASE WAIT</p></div>
  // }

  return (
    <div className="app-container">
      <Navbar/>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/test" element={<Loading/>}/>
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
  );
}

export default App;
