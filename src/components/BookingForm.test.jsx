import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi, beforeEach } from "vitest";
import BookingForm from "./BookingForm";
import { useBooking } from "../context/BookingContext";
import { fetchAPI } from "../api";

vi.mock("../context/BookingContext", () => ({
  useBooking: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const mockContext = (submitForm = vi.fn()) => {
  useBooking.mockReturnValue({
    availableTimes: ["10:00", "12:00", "14:00", "18:00"],
    dispatch: vi.fn(),
    submitForm,
    bookings: [],
  });
};

test("renders the BookingForm heading", () => {
  mockContext();

  render(<BookingForm />);

  expect(screen.getByText(/book now/i)).toBeInTheDocument();
});

test("submits correct data", async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();

  mockContext(handleSubmit);

  render(<BookingForm />);

  const futureDate = "2099-06-10";

  await user.clear(screen.getByLabelText(/choose date/i));
  await user.type(screen.getByLabelText(/choose date/i), futureDate);

  const timeButton = await screen.findByText("18:00");
  await user.click(timeButton);

  await user.type(
    screen.getByLabelText(/number of guests/i),
    "2"
  );

  await user.selectOptions(
    screen.getByLabelText(/occasion/i),
    "Birthday"
  );

  await user.click(
    screen.getByRole("button", { name: /confirm reservation/i })
  );

  expect(handleSubmit).toHaveBeenCalledTimes(1);

  expect(handleSubmit).toHaveBeenCalledWith({
    date: futureDate,
    time: "18:00",
    guests: 2,
    occasion: "Birthday",
  });
});

test("does not show past times for today", async () => {
  const user = userEvent.setup();

  mockContext();

  render(<BookingForm />);

  const today = new Date().toISOString().split("T")[0];

  await user.type(
    screen.getByLabelText(/choose date/i),
    today
  );

  const nowHour = new Date().getHours();

  const allTimes = ["10:00", "12:00", "14:00", "18:00"];

  for (const time of allTimes) {
    const hour = Number(time.split(":")[0]);

    if (hour < nowHour) {
      expect(screen.queryByText(time)).not.toBeInTheDocument();
    }
  }
});