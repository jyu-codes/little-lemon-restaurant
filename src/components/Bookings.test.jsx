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

test("shows reset icon only when bookings exist", () => {
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

  render(<Bookings />);

  const icon = screen.getByTitle(/reset bookings/i);

  expect(icon).toBeInTheDocument();
});

test("does not show reset icon when no bookings exist", () => {
  useBooking.mockReturnValue({
    bookings: [],
    resetBookings: vi.fn(),
  });

  render(<Bookings />);

  expect(screen.queryByTitle(/reset bookings/i)).not.toBeInTheDocument();
});

import userEvent from "@testing-library/user-event";

test("calls resetBookings when trash icon is clicked", async () => {
  const user = userEvent.setup();
  const resetMock = vi.fn();

  useBooking.mockReturnValue({
    bookings: [
      {
        date: "2026-06-10",
        time: "17:00",
        guests: 2,
        occasion: "Birthday",
      },
    ],
    resetBookings: resetMock,
  });

  render(<Bookings />);

  const icon = screen.getByTitle(/reset bookings/i);

  await user.click(icon);

  expect(resetMock).toHaveBeenCalledTimes(1);
});