import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import Cadastro from "./pages/Cadastro/cadastro";
import Favoritos from "./pages/Favoritos/favoritos";
import HotelDetails from "./pages/HotelDetails/HotelDetails";


function App(){
  return (
<>
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
    </Routes>
</>
);
}
export default App;