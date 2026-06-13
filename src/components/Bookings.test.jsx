import { render, within, screen } from "@testing-library/react";
import { vi, test, expect, beforeEach } from "vitest";
import Bookings from "./Bookings";
import { useBooking } from "../context/BookingContext";

vi.mock("../context/BookingContext", () => ({
  useBooking: vi.fn(),
}));

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

const mockContext = (overrides = {}) => {
  useBooking.mockReturnValue({
    bookings: [],
    resetBookings: vi.fn(),
    ...overrides,
  });
};

test("renders empty bookings state", () => {
  mockContext({
    bookings: [],
  });

  render(<Bookings />);

  expect(screen.getByText(/no bookings yet/i)).toBeInTheDocument();
});

test("renders booking data", () => {
  useBooking.mockReturnValue({
    bookings: [
      {
        date: "2026-06-10",
        time: "17:00",
        guests: 2,
        occasion: "Birthday",
      },
    ],
    resetBookings: vi.fn(),
  });

  const { container } = render(<Bookings />);

  const bookingsContainer = container.querySelector(".bookings-container");

  const utils = within(bookingsContainer);

  const row = utils.getByText("2026-06-10").closest("tr");

  expect(row).toHaveTextContent("17:00");
  expect(row).toHaveTextContent("2");
  expect(row).toHaveTextContent("Birthday");
});