import { render } from "@testing-library/react";

import { Timeline, TimelineProps } from "./Timeline";
import { MOCK_FLIGHTS } from "../utils/mock";

describe("Testing Timeline component", () => {
  const defaultProps: TimelineProps = {
    schedule: MOCK_FLIGHTS,
  };
  it("Should render correctly with no props", () => {
    const element = render(<Timeline />);
    expect(element).toMatchSnapshot();
  });

  it("Should render correctly with default props", () => {
    const element = render(<Timeline {...defaultProps} />);
    expect(element).toMatchSnapshot();
  });
});
