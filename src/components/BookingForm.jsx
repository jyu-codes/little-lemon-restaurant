import { useState } from "react";

const BookingForm = ({ availableTimes, dispatch, onSubmit }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !time || !guests || !occasion) {
      alert("Please fill all fields");
      return;
    }

    onSubmit({
      date,
      time,
      guests,
      occasion,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Book Now</h1>

      {/* DATE */}
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
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
      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="">Select time</option>
        {availableTimes?.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* GUESTS */}
      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        placeholder="Select number of guests"
      />

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
      </select>

      {/* SUBMIT */}
      <button type="submit">Confirm Reservation</button>
    </form>
  );
};

export default BookingForm;