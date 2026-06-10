import { render, screen } from "@testing-library/react";
import { vi, test, expect, beforeEach } from "vitest";
import Bookings from "./Bookings";

beforeEach(() => {
  localStorage.clear();
});

test("writes booking data to localStorage", () => {
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

  render(<Bookings availableTimes={[]} dispatch={() => {}} submitForm={() => {}} />);

  const mockBooking = {
    date: "2026-06-10",
    time: "17:00",
    guests: 2,
    occasion: "Birthday",
  };

  expect(setItemSpy).toHaveBeenCalled();
});

test("reads booking data from localStorage on load", () => {
  const mockData = [
    {
      date: "2026-06-10",
      time: "17:00",
      guests: 2,
      occasion: "Birthday",
    },
  ];

  localStorage.setItem("bookings", JSON.stringify(mockData));

  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");

  render(<Bookings availableTimes={[]} dispatch={() => {}} submitForm={() => {}} />);

  expect(getItemSpy).toHaveBeenCalledWith("bookings");
});