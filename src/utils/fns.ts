import { format } from "date-fns";
import { Flight } from "../types";
import { DAY_IN_SECONDS, TURNAROUND_TIME_IN_SECONDS } from "./constants";

export const getToday = () => format(new Date(), "do MMMM yyyy");

export const getTotalDuration = (flights: Flight[]) => {
  const totalFlightTime = flights.reduce((acc, flight) => {
    return acc + flight.arrivaltime - flight.departuretime;
  }, 0);

  const totalConnectionTime = (flights.length - 1) * TURNAROUND_TIME_IN_SECONDS;

  return totalFlightTime + totalConnectionTime;
};

export const getAircraftUtilization = (totalUsageTime: number) =>
  Math.round((totalUsageTime / DAY_IN_SECONDS) * 100) + " %";

export const replaceElementWithoutMutating = <T>(
  index: number,
  element: T,
  arr: T[]
) => {
  return [...arr.slice(0, index), element, ...arr.slice(index + 1)];
};
