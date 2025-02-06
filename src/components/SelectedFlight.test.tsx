import { render, screen, fireEvent } from "@testing-library/react";
import {
  SelectedFlight,
  SelectedFlightProps,
} from "../components/SelectedFlight";
import { MOCK_FLIGHTS } from "../utils/mock";

describe("SelectedFlight Component", () => {
  const defaultProps: SelectedFlightProps = {
    ...MOCK_FLIGHTS[0],
    onRemove: jest.fn(),
    onSelect: jest.fn(),
    isSelected: false,
  };

  it("Should render correct styles when isSelected is false", () => {
    render(<SelectedFlight {...defaultProps} />);

    expect(screen.getByRole("button")).toHaveClass("bg-black");
    expect(screen.getByText(`Flight: ${defaultProps.ident}`)).toHaveClass(
      "text-white"
    );
    expect(screen.getByTestId("departure")).toHaveClass("bg-white text-black");
    expect(screen.getByTestId("arrival")).toHaveClass("bg-white text-black");
  });

  it("Should apply selected styles when isSelected is true", () => {
    render(<SelectedFlight {...defaultProps} isSelected />);

    expect(screen.getByRole("button")).toHaveClass("bg-white");
    expect(screen.getByText(`Flight: ${defaultProps.ident}`)).toHaveClass(
      "text-black"
    );
    expect(screen.getByTestId("departure")).toHaveClass("bg-black text-white");
    expect(screen.getByTestId("arrival")).toHaveClass("bg-black text-white");
  });

  it("Should trigger onSelect when button is clicked", () => {
    render(<SelectedFlight {...defaultProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(defaultProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it("Should trigger onRemove when button is clicked", () => {
    render(<SelectedFlight {...defaultProps} />);
    fireEvent.click(screen.getByTestId("remove-button"));
    expect(defaultProps.onRemove).toHaveBeenCalledTimes(1);
  });
});
