import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi, beforeEach } from "vitest";
import BookingForm from "./BookingForm";
import { useBooking } from "../context/BookingContext";

vi.mock("../context/BookingContext", () => ({
  useBooking: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

/* =========================
   MOCK
========================= */

const mockContext = (submitForm = vi.fn()) => {
  useBooking.mockReturnValue({
    availableTimes: ["10:00", "12:00", "14:00", "18:00"],
    dispatch: vi.fn(),
    submitForm,
    bookings: [],
  });
};

/* =========================
   HELPERS
========================= */

const fillRequiredFields = async (user) => {
  await user.type(
    screen.getByLabelText(/enter your name/i),
    "jane doe"
  );

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-06-10" },
  });

  await user.click(await screen.findByText("18:00"));

  fireEvent.change(screen.getByLabelText(/number of guests/i), {
    target: { value: "2" },
  });
};

/* =========================
   BASIC RENDER
========================= */

test("renders BookingForm heading", () => {
  mockContext();

  render(<BookingForm />);

  expect(screen.getByText(/book now/i)).toBeInTheDocument();
});

test("renders required fields", () => {
  mockContext();

  render(<BookingForm />);

  expect(
    screen.getByLabelText(/enter your name/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/choose date/i)
  ).toBeInTheDocument();
});

/* =========================
   CONDITIONAL RENDERING
========================= */

test("does not show time slots until a date is selected", () => {
  mockContext();

  render(<BookingForm />);

  expect(screen.queryByText("18:00")).not.toBeInTheDocument();
});

test("shows time slots after selecting a date", async () => {
  mockContext();

  render(<BookingForm />);

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-06-10" },
  });

  expect(await screen.findByText("10:00")).toBeInTheDocument();
  expect(await screen.findByText("18:00")).toBeInTheDocument();
});

test("does not show guest and occasion fields until a time is selected", async () => {
  mockContext();

  render(<BookingForm />);

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-06-10" },
  });

  expect(
    screen.queryByLabelText(/number of guests/i)
  ).not.toBeInTheDocument();

  expect(
    screen.queryByLabelText(/occasion/i)
  ).not.toBeInTheDocument();
});

test("shows guest and occasion fields after selecting a time", async () => {
  const user = userEvent.setup();

  mockContext();

  render(<BookingForm />);

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-06-10" },
  });

  await user.click(await screen.findByText("18:00"));

  expect(
    screen.getByLabelText(/number of guests/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/occasion/i)
  ).toBeInTheDocument();
});

/* =========================
   SUBMISSION
========================= */

test("submits correct booking data", async () => {
  const submitForm = vi.fn();

  mockContext(submitForm);

  const user = userEvent.setup();

  render(<BookingForm />);

  await fillRequiredFields(user);

  await user.selectOptions(
    screen.getByLabelText(/occasion/i),
    "Birthday"
  );

  await user.click(
    screen.getByRole("button", {
      name: /confirm/i,
    })
  );

  expect(submitForm).toHaveBeenCalledTimes(1);

  expect(submitForm).toHaveBeenCalledWith({
    name: "jane doe",
    date: "2099-06-10",
    time: "18:00",
    guests: 2,
    occasion: "Birthday",
  });
});

test("uses Not specified when occasion is empty", async () => {
  const submitForm = vi.fn();

  mockContext(submitForm);

  const user = userEvent.setup();

  render(<BookingForm />);

  await fillRequiredFields(user);

  await user.click(
    screen.getByRole("button", {
      name: /confirm/i,
    })
  );

  expect(submitForm).toHaveBeenCalledWith(
    expect.objectContaining({
      occasion: "Not specified",
    })
  );
});

/* =========================
   GUEST VALIDATION
========================= */

test("shows error when guests exceed maximum", async () => {
  const user = userEvent.setup();

  mockContext();

  render(<BookingForm />);

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-06-10" },
  });

  await user.click(await screen.findByText("18:00"));

  await user.type(
    screen.getByLabelText(/number of guests/i),
    "99"
  );

  expect(
    screen.getByText(/maximum 10 guests/i)
  ).toBeInTheDocument();
});

test("shows error when guests below minimum", async () => {
  const user = userEvent.setup();

  mockContext();

  render(<BookingForm />);

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-06-10" },
  });

  await user.click(await screen.findByText("18:00"));

  await user.type(
    screen.getByLabelText(/number of guests/i),
    "0"
  );

  expect(
    screen.getByText(/minimum 1 guest/i)
  ).toBeInTheDocument();
});

test("clears guest error when valid number is entered", async () => {
  const user = userEvent.setup();

  mockContext();

  render(<BookingForm />);

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-06-10" },
  });

  await user.click(await screen.findByText("18:00"));

  const guestsInput =
    screen.getByLabelText(/number of guests/i);

  await user.type(guestsInput, "99");

  expect(
    screen.getByText(/maximum 10 guests/i)
  ).toBeInTheDocument();

  await user.clear(guestsInput);
  await user.type(guestsInput, "5");

  expect(
    screen.queryByText(/maximum 10 guests/i)
  ).not.toBeInTheDocument();

  expect(
    screen.queryByText(/minimum 1 guest/i)
  ).not.toBeInTheDocument();
});

/* =========================
   TIME SELECTION
========================= */

test("selects time slot when clicked", async () => {
  const user = userEvent.setup();

  mockContext();

  render(<BookingForm />);

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-06-10" },
  });

  const timeButton = await screen.findByText("18:00");

  await user.click(timeButton);

  expect(timeButton).toHaveClass("selected");
});

/* =========================
   RESET AFTER SUBMIT
========================= */

test("clears form after successful submission", async () => {
  const submitForm = vi.fn();

  mockContext(submitForm);

  const user = userEvent.setup();

  render(<BookingForm />);

  await fillRequiredFields(user);

  await user.selectOptions(
    screen.getByLabelText(/occasion/i),
    "Birthday"
  );

  await user.click(
    screen.getByRole("button", {
      name: /confirm/i,
    })
  );

  expect(
    screen.getByLabelText(/enter your name/i)
  ).toHaveValue("");

  expect(
    screen.getByLabelText(/choose date/i)
  ).toHaveValue("");

  expect(
    screen.queryByLabelText(/number of guests/i)
  ).not.toBeInTheDocument();

  expect(
    screen.queryByLabelText(/occasion/i)
  ).not.toBeInTheDocument();
});

/* =========================
   BUTTON STATE
========================= */

test("disables submit when form is incomplete", () => {
  mockContext();

  render(<BookingForm />);

  expect(
    screen.getByRole("button", {
      name: /confirm/i,
    })
  ).toBeDisabled();
});

test("enables submit when required fields are complete", async () => {
  const user = userEvent.setup();

  mockContext();

  render(<BookingForm />);

  await fillRequiredFields(user);

  expect(
    screen.getByRole("button", {
      name: /confirm/i,
    })
  ).toBeEnabled();
});

/* =========================
   AVAILABLE TIMES
========================= */

test("renders available times from context", async () => {
  mockContext();

  render(<BookingForm />);

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-06-10" },
  });

  expect(await screen.findByText("10:00")).toBeInTheDocument();
  expect(await screen.findByText("18:00")).toBeInTheDocument();
});

/* =========================
   CLEAR PROGRESS
========================= */

test("clears all form progress when Clear is clicked", async () => {
  const user = userEvent.setup();

  mockContext();

  render(<BookingForm />);

  await fillRequiredFields(user);

  await user.selectOptions(
    screen.getByLabelText(/occasion/i),
    "Birthday"
  );

  await user.click(
    screen.getByRole("button", {
      name: /clear/i,
    })
  );

  expect(
    screen.getByLabelText(/enter your name/i)
  ).toHaveValue("");

  expect(
    screen.getByLabelText(/choose date/i)
  ).toHaveValue("");

  expect(
    screen.queryByLabelText(/number of guests/i)
  ).not.toBeInTheDocument();

  expect(
    screen.queryByLabelText(/occasion/i)
  ).not.toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /confirm/i,
    })
  ).toBeDisabled();
});