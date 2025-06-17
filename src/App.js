import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./components/home/Home"; // İSTİFADƏ OLUNMUR, SİLİNDİ
import CreateAd from "./CreateAd";
import EditAd from "./EditAd";

import Login from './components/Login';
import Register from './components/Register';
import Container from "./components/Container";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/create" element={<CreateAd />} />
        {/* <Route path="/update/:id" element={<UpdateAd />} />
        <Route path="/view/:id" element={<ViewAd />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<EditAd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
