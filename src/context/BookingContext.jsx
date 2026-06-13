import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { initializeTimes, updateTimes } from "../reducers/bookingReducer";
import { submitAPI } from "../api";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const submitForm = (formData) => {
    const updated = [...bookings, formData];
    setBookings(updated);

    const success = submitAPI(formData);

    if (success) {
      navigate("/confirmed", { state: formData });
    }
  };

  const resetBookings = () => {
    setBookings([]);
    localStorage.removeItem("bookings");
  };

  return (
    <BookingContext.Provider
      value={{
        availableTimes,
        dispatch,
        submitForm,
        bookings,
        resetBookings,
        lastBooking: bookings[bookings.length - 1] || null,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);