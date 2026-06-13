import { useState } from "react";
import { useBooking } from "../context/BookingContext";

const BookingForm = () => {
  const { availableTimes, dispatch, submitForm, bookings } = useBooking();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("");
  const [error, setError] = useState("");

  const isFormValid =
    date &&
    time &&
    occasion &&
    guests &&
    Number(guests) >= 1 &&
    Number(guests) <= 10;

  const handleGuestsChange = (e) => {
    const value = e.target.value;
    setGuests(value);

    if (value === "") {
      setError("");
      return;
    }

    const num = Number(value);

    if (num < 1) {
      setError("Minimum number of guests is 1");
    } else if (num > 10) {
      setError("Maximum number of guests is 10");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      date,
      time,
      guests: Number(guests),
      occasion,
    };

    submitForm(formData);

    setDate("");
    setTime("");
    setGuests("");
    setOccasion("");
    setError("");
  };

  const now = new Date();
  const selectedDate = new Date(date);
  const todayStr = now.toISOString().split("T")[0];

  const isPastTime = (time) => {
    if (date !== todayStr) return false;

    const [hours, minutes] = time.split(":").map(Number);

    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);

    return slotTime < now;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Book Now</h1>

      {/* DATE */}
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        min={todayStr}
        value={date}
        onChange={(e) => {
          setDate(e.target.value);

          dispatch({
            type: "UPDATE_TIMES",
            date: e.target.value,
          });
        }}
      />

      {/* TIME */}
      {date && (
        <>
          <label>Choose time</label>

          <div className="time-picker">
            {availableTimes
              ?.filter(
                (t) =>
                  !bookings.some(
                    (b) => b.date === date && b.time === t
                  )
              )
              .filter((t) => !isPastTime(t))
              .map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`time-slot ${
                    time === t ? "selected" : ""
                  }`}
                  onClick={() => setTime(t)}
                >
                  {t}
                </button>
              ))}
          </div>
        </>
      )}

      {/* GUESTS */}
      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={handleGuestsChange}
      />

      {error && (
        <p style={{ color: "red", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      {/* OCCASION */}
      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="">Occasion</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Date Night">Date Night</option>
        <option value="Engagement">Engagement</option>
        <option value="Graduation">Graduation</option>
        <option value="Business Dinner">Business Dinner</option>
        <option value="Family Gathering">Family Gathering</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit" disabled={!isFormValid}>
        Confirm Reservation
      </button>
    </form>
  );
};

export default BookingForm;