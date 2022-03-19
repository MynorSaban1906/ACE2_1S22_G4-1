import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Experimento1 from "./pages/Experimento1";
import Experimento2 from "./pages/Experimento2";
import Experimento3 from "./pages/Experimento3";
import Experimento4 from "./pages/Experimento4";
import Experimento5 from "./pages/Experimento5";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Exp5" element={<Experimento5/>}/>
        <Route path="/Exp4" element={<Experimento4/>}/>
        <Route path="/Exp3" element={<Experimento3/>}/>
        <Route path="/Exp2" element={<Experimento2/>}/>
        <Route path="/Exp1" element={<Experimento1/>}/>
        <Route path="/" element={<Home/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
