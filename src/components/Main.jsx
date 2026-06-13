import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";
import { BookingProvider } from "../context/BookingContext";

const Main = () => {
  return (
    <main>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/reservations"
            element={<BookingPage />}
          />

          <Route
            path="/confirmed"
            element={<ConfirmedBooking />}
          />
        </Routes>
      </BookingProvider>
    </main>
  );
};

export default Main;