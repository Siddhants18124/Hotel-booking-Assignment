import "./App.css";
import HotelDetails from "./components/HotelDetails/HotelDetails";
import HotelList from "./components/HotelList/HotelList";
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
