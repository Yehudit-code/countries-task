import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesPage from './pages/CountriesPage';
import EditCountryPage from "./pages/EditCountryPage/EditCountryPage";
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authUserState } from "./store/auth.store";
import { getMe } from "./api/auth.api";



function App() {
  const setUser = useSetRecoilState(authUserState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getMe()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);
  
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<CountriesPage />} />
        <Route path="/countries/new" element={<EditCountryPage />} />
        <Route path="/countries/:id" element={<EditCountryPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
