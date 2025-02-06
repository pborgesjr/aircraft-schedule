import { render, screen, fireEvent } from "@testing-library/react";
import { Aircraft } from "../components/Aircraft";
import { AirCraft } from "../types";
import { MOCK_AIRCRAFTS } from "../utils/mock";

jest.mock("../utils", () => ({
  getPercentage: jest.fn(() => 50),
  getTotalDuration: jest.fn(() => 100),
}));

describe("Aircraft Component", () => {
  const MOCK_AIRCRAFT = MOCK_AIRCRAFTS[0];

  it("Should render aircraft identifier and percentage", () => {
    render(
      <Aircraft
        aircraft={MOCK_AIRCRAFT}
        onClick={() => {}}
        isSelected={false}
      />
    );
    expect(screen.getByText(MOCK_AIRCRAFT.ident)).toBeInTheDocument();
    expect(screen.getByText("50 %")).toBeInTheDocument();
  });

  it("Should render correct styles when isSelected is false", () => {
    render(
      <Aircraft
        aircraft={MOCK_AIRCRAFT}
        onClick={() => {}}
        isSelected={false}
      />
    );
    expect(screen.getByText(MOCK_AIRCRAFT.ident)).toHaveClass("text-white");
    expect(screen.getByText("50 %")).toHaveClass("text-white");
  });

  it("Should apply selected styles when isSelected is true", () => {
    render(
      <Aircraft aircraft={MOCK_AIRCRAFT} onClick={() => {}} isSelected={true} />
    );
    expect(screen.getByRole("button")).toHaveClass("bg-white");
    expect(screen.getByText(MOCK_AIRCRAFT.ident)).toHaveClass("text-black");
    expect(screen.getByText("50 %")).toHaveClass("text-black");
  });

  it("Should trigger onClick when button is clicked", () => {
    const handleClick = jest.fn();

    render(
      <Aircraft
        aircraft={MOCK_AIRCRAFT}
        onClick={handleClick}
        isSelected={false}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Should display 0 % when no schedule exists", () => {
    const aircraftWithoutSchedule: AirCraft = {
      ...MOCK_AIRCRAFT,
      schedule: [],
    };
    render(
      <Aircraft
        aircraft={aircraftWithoutSchedule}
        onClick={() => {}}
        isSelected={false}
      />
    );
    expect(screen.getByText("0 %")).toBeInTheDocument();
  });
});
