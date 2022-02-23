import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Experimento1 from "./pages/Experimento1";
import Experimento2 from "./pages/Experimento2";
import Experimento3 from "./pages/Experimento3";
import GraficaCO2 from "./pages/GraficaCO2";
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/GraficaCO2" element={<GraficaCO2/>}/>
          <Route path="/Experimento3" element={<Experimento3/>}/>
          <Route path="/Experimento2" element={<Experimento2/>}/>
          <Route path="/Experimento1" element={<Experimento1/>}/>
          <Route path="/" element={<Home />}>
        </Route>
        </Routes>   
      </BrowserRouter>
  );
}

export default App;
