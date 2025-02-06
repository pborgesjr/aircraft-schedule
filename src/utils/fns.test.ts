import { MOCK_FLIGHTS } from "./mock";
import { Flight } from "../types";
import {
  getPercentage,
  getTotalDuration,
  replaceElementWithoutMutating,
} from "./fns";
import { DAY_IN_SECONDS } from "./constants";

describe("Testing fns", () => {
  describe("getTotalDuration", () => {
    it("Should return correct total duration including flight time and turnaround time", () => {
      expect(getTotalDuration(MOCK_FLIGHTS)).toBe(11100);
    });

    it("Should return 0 if no flights are provided", () => {
      const emptyFlights: Flight[] = [];
      expect(getTotalDuration(emptyFlights)).toBe(0);
    });
  });
  describe("getPercentage", () => {
    it("Should return 0% for 0 seconds", () => {
      expect(getPercentage(0)).toBe(0);
    });

    it("Should return 50% when 12 hours is provided", () => {
      expect(getPercentage(DAY_IN_SECONDS / 2)).toBe(50);
    });

    it("Should return 100% for a full day", () => {
      expect(getPercentage(DAY_IN_SECONDS)).toBe(100);
    });

    it("Should round correctly for partial values", () => {
      expect(getPercentage(11100)).toBe(13);
    });
  });
  describe("replaceElementWithoutMutating", () => {
    it("Should replace element at a specified index", () => {
      const original = [1, 2, 3];
      const updated = replaceElementWithoutMutating(1, 99, original);
      expect(updated).toEqual([1, 99, 3]);
      expect(original).toEqual([1, 2, 3]);
    });

    it("Should replace the first element", () => {
      const original = ["a", "b", "c"];
      const updated = replaceElementWithoutMutating(0, "x", original);
      expect(updated).toEqual(["x", "b", "c"]);
    });

    it("Should replace the last element", () => {
      const original = [true, false];
      const updated = replaceElementWithoutMutating(1, true, original);
      expect(updated).toEqual([true, true]);
    });
  });
});
