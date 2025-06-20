import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAd from "./components/create/CreateAd";
import EditAd from "./components/edit/EditAd";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Container from "./components/Container";
import ProtectedRoute from './components/ProtectedRoute'; // 👈 əlavə olunur
import MyCars from "./components/myCars/MyCars";
import View from './components/view/View';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} />
        
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateAd />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditAd />
            </ProtectedRoute>
          }
        />

         <Route
          path="/mycars"
          element={
            <ProtectedRoute>
              <MyCars />
            </ProtectedRoute>
          }
        />

         <Route path="/view/:id" element={<View />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
