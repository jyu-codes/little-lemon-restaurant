import { useState, useMemo } from "react";
import { useBooking } from "../context/BookingContext";

const BookingForm = () => {
  const { availableTimes, dispatch, submitForm, bookings } = useBooking();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [occasion, setOccasion] = useState("");
  const [error, setError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  const Required = () => <span className="required">*</span>;

  /* =========================
     GUEST VALIDATION
  ========================= */

  const handleGuestsChange = (e) => {
    const value = e.target.value;
    setGuests(value);

    const num = Number(value);

    if (value === "") {
      setError("");
      return;
    }

    if (num < 1) setError("Minimum 1 guest");
    else if (num > 10) setError("Maximum 10 guests");
    else setError("");
  };

  /* =========================
     TIME FILTERING
  ========================= */

  const isPastTime = (t) => {
    if (date !== todayStr) return false;

    const now = new Date();
    const [h, m] = t.split(":").map(Number);

    const slot = new Date();
    slot.setHours(h, m, 0, 0);

    return slot < now;
  };

  const filteredTimes = useMemo(() => {
    if (!date) return [];

    return availableTimes
      .filter(
        (t) => !bookings.some((b) => b.date === date && b.time === t)
      )
      .filter((t) => !isPastTime(t));
  }, [availableTimes, bookings, date]);

  /* =========================
     FORM VALIDATION (light)
  ========================= */

  const isFormValid =
    name.trim().length > 1 &&
    date &&
    time &&
    guests &&
    Number(guests) >= 1 &&
    Number(guests) <= 10;

  /* =========================
     ACTIONS
  ========================= */

  const resetForm = () => {
    setName("");
    setDate("");
    setTime("");
    setGuests("");
    setOccasion("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    submitForm({
      name,
      date,
      time,
      guests: Number(guests),
      occasion: occasion || "Not specified",
    });

    resetForm();
  };

  /* =========================
     UI FLOW RULES
  ========================= */

  const showTime = !!date;
  const showDetails = !!time;

  /* =========================
     UI
  ========================= */

  return (
    <form onSubmit={handleSubmit}>
      <h1>Book Now</h1>

      {/* NAME */}
      <label htmlFor="res-name">
        Enter your name <Required />
      </label>
      <input
        id="res-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      {/* DATE */}
      <label htmlFor="res-date">
        Choose date <Required />
      </label>
      <input
        type="date"
        id="res-date"
        min={todayStr}
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setTime("");
          dispatch({
            type: "UPDATE_TIMES",
            date: e.target.value,
          });
        }}
      />

      {/* TIME (only after date) */}
      {showTime && (
        <>
          <label>
            Choose time <Required />
          </label>

          <div className="time-picker">
            {filteredTimes.map((t) => (
              <button
                key={t}
                type="button"
                className={`time-slot ${
                  time === t ? "selected" : ""
                }`}
                aria-pressed={time === t}
                onClick={() => setTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </>
      )}

      {/* DETAILS (only after time) */}
      {showDetails && (
        <>
          <label htmlFor="guests">
            Number of guests <Required />
          </label>
          <input
            id="guests"
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={handleGuestsChange}
          />

          {error && (
            <p role="alert" className="error-text">
              {error}
            </p>
          )}

          <label htmlFor="occasion">
            Occasion (optional)
          </label>
          <select
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option value="">Select occasion</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Date Night">Date Night</option>
            <option value="Other">Other</option>
          </select>
        </>
      )}

      {/* BUTTONS (always visible) */}
      <div className="formButtons">
        <button type="button" className="clear-btn" onClick={resetForm}>
          Clear
        </button>

        <button type="submit" disabled={!isFormValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default BookingForm;