import { test, expect } from "vitest";
import { initializeTimes, updateTimes } from "./bookingReducer";

test("initializeTimes returns available times from API", () => {
  const result = initializeTimes();

  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
});

test("updateTimes returns available times for selected date", () => {
  const initialState = [];

  const action = {
    type: "UPDATE_TIMES",
    date: "2026-06-10",
  };

  const result = updateTimes(initialState, action);

  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);
});