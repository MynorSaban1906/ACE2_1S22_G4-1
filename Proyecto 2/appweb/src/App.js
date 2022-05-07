import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import Exp1 from "./pages/Exp1";
import Exp2 from "./pages/Exp2";
import Exp3 from "./pages/Exp3";
import Exp4 from "./pages/Exp4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Exp4" element={<Exp4/>}/>
        <Route path="/Exp3" element={<Exp3/>}/>
        <Route path="/Exp2" element={<Exp2/>}/>
        <Route path="/Exp1" element={<Exp1/>}/>
        <Route path="/" element={<Home/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
