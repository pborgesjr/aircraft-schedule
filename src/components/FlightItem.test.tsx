import { render, screen, fireEvent } from "@testing-library/react";
import { FlightItem, FlightProps } from "./FlightItem";
import { MOCK_FLIGHTS } from "../utils/mock";

describe("Testing FlightItem component", () => {
  const defaultProps: FlightProps = {
    id: MOCK_FLIGHTS[0].ident,
    departure: MOCK_FLIGHTS[0].readable_departure,
    arrival: MOCK_FLIGHTS[0].readable_arrival,
    origin: MOCK_FLIGHTS[0].origin,
    destination: MOCK_FLIGHTS[0].destination,
    onClick: jest.fn(),
  };

  it("Should match with the snapshot", () => {
    const element = render(<FlightItem {...defaultProps} />);
    expect(element).toMatchSnapshot();
  });

  it("Should fire onClick when button is pressed", () => {
    render(<FlightItem {...defaultProps} />);

    fireEvent.click(screen.getByRole("button"));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
