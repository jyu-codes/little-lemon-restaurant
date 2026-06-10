import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, afterEach } from "vitest";
import BookingForm from "./BookingForm";

describe("BookingForm", () => {
  test("renders the BookingForm heading", () => {
    render(
      <BookingForm
        availableTimes={["17:00"]}
        dispatch={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByText(/book now/i)).toBeInTheDocument();
  });

  test("submits correct data", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <BookingForm
        availableTimes={["17:00", "18:00"]}
        dispatch={() => {}}
        onSubmit={handleSubmit}
      />
    );

    await user.type(
      screen.getByLabelText(/choose date/i),
      "2026-06-10"
    );

    await user.selectOptions(
      screen.getByLabelText(/choose time/i),
      "17:00"
    );

    await user.type(
      screen.getByLabelText(/number of guests/i),
      "2"
    );

    await user.selectOptions(
      screen.getByLabelText(/occasion/i),
      "Birthday"
    );

    await user.click(
      screen.getByText(/confirm reservation/i)
    );

    expect(handleSubmit).toHaveBeenCalledTimes(1);

    expect(handleSubmit).toHaveBeenCalledWith({
      date: "2026-06-10",
      time: "17:00",
      guests: "2",
      occasion: "Birthday",
    });
  });
});