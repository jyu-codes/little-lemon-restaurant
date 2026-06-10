import { Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import HomePage from "../pages/HomePage";
import BookingPage from "../pages/BookingPage";
import { initializeTimes, updateTimes } from "../reducers/bookingReducer";

const Main = () => {

  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/reservations"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
            />
          }
        />
      </Routes>
    </main>
  );
};

export default Main;