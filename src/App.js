import "./App.css";
import HotelDetails from "./pages/HotelDetails/HotelDetails";
import HotelList from "./pages/HotelList/HotelList";
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
