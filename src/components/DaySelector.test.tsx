import { render } from "@testing-library/react";
import { DaySelector } from "./DaySelector";

describe("Testing DaySelector component", () => {
  it("Should match with the snapshot", () => {
    const element = render(<DaySelector />);
    expect(element).toMatchSnapshot();
  });
});
