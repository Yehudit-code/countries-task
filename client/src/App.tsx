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
import UserProfilePage from './pages/profile/UserProfilePage';
import AdminGuard from './components/guards/AdminGuard';
import AdminRoutes from './AdminRoutes';
import AccessPage from './pages/AccessPage';
import AuthGuard from './components/guards/AuthGuard';



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
        console.warn("Session expired");
      });

  }, [setUser]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route element={<AuthGuard />}>
          <Route path="/" element={<CountriesPage />} />
        </Route>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/countries/new" element={<EditCountryPage />} />
        <Route path="/countries/:id" element={<EditCountryPage />} />
        <Route path="/access" element={<AccessPage />} />

        <Route element={<AdminGuard />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App
