import BookingForm from "./BookingForm";

const Bookings = ({ availableTimes, dispatch }) => {
  return (
    <BookingForm
      availableTimes={availableTimes}
      dispatch={dispatch}
    />
  );
};

export default Bookings;