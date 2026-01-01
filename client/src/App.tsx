import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesPage from './pages/CountriesPage';
import EditCountryPage from "./pages/EditCountryPage/EditCountryPage";
import Navbar from './components/Navbar/Navbar';


function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<CountriesPage />} />
        <Route path="/countries/new" element={<EditCountryPage />} />
        <Route path="/countries/:id" element={<EditCountryPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
