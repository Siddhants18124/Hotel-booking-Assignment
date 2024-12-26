import "./App.css";
import Hero from "./components/Hero/Hero";
import HotelDetails from "./components/HotelDetails/HotelDetails";
import HotelList from "./components/HotelList/HotelList";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HotelList />} />
      <Route path="/hotels/:hotelId" element={<HotelDetails />} />
    </Routes>
  );
}

export default App;
