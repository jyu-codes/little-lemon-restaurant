import { Routes, Route, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";

import { initializeTimes, updateTimes } from "../reducers/bookingReducer";
import { submitAPI } from "../api";

const Main = () => {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  const navigate = useNavigate();

  const submitForm = (formData) => {
    const success = submitAPI(formData);

    if (success) {
      // Navigate to /confirmed and pass booking data
      navigate("/confirmed", { state: formData });
    }
  };

  return (
    <main>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Booking page */}
        <Route
          path="/reservations"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />

        {/* Booking confirmation page */}
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
};

export default Main;