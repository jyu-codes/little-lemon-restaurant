import { test, expect } from "vitest";
import { initializeTimes, updateTimes } from "./bookingReducer";

test("initializeTimes returns correct time slots", () => {
  expect(initializeTimes()).toEqual([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ]);
});

test("updateTimes returns same state (for now)", () => {
  const state = ["17:00", "18:00"];

  const action = {
    type: "UPDATE_TIMES",
    date: "2026-06-10",
  };

  expect(updateTimes(state, action)).toEqual([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ]);
});