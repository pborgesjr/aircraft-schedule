import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "./axios";
import { Flight } from "../types";
import {
  getTotalDuration,
  MAX_FLIGHT_DURATION_IN_SECONDS,
  TURNAROUND_TIME_IN_SECONDS,
} from "../utils";

const fetchFlights = async () => {
  try {
    const response = await axiosClient
      .get<Flight[]>("/flights")
      .then((res) => res.data);

    return response;
  } catch {
    throw new Error("Error fetching flights");
  }
};

type UseFlightsProps = {
  schedule?: Flight[];
  selectedFlightID?: string;
};

export const useFlights = ({
  schedule = [],
  selectedFlightID,
}: UseFlightsProps) =>
  useQuery({
    queryKey: ["flights"],
    queryFn: fetchFlights,
    select: (data) => {
      if (selectedFlightID) {
        if (schedule.length < 2) {
          // If the schedule has less than 2 flights, return all flights
          return data;
        }

        const selectedFlight = schedule.find(
          (flight) => flight.ident === selectedFlightID
        );

        const dataWithoutSelectedFlight = data.filter(
          (item) => item.ident !== selectedFlightID
        );
        return dataWithoutSelectedFlight.filter(
          (flight) =>
            flight.origin === selectedFlight?.origin && // Check if the origin is the same
            flight.arrivaltime -
              flight.departuretime +
              TURNAROUND_TIME_IN_SECONDS +
              getTotalDuration(schedule) < // Check if the total duration of the flight is less than the maximum flight duration
              MAX_FLIGHT_DURATION_IN_SECONDS &&
            flight.departuretime >
              selectedFlight?.arrivaltime + TURNAROUND_TIME_IN_SECONDS // Check if the departure time of the flight is after the arrival time of the last flight in the schedule
        );
      }

      if (!schedule || schedule.length === 0) return data;

      const lastIndex = schedule.length - 1;
      const totalDuration = getTotalDuration(schedule);

      return data.filter(
        (flight) =>
          flight.origin === schedule[lastIndex].destination && // Check if the origin of the flight is the same as the destination of the last flight in the schedule
          flight.arrivaltime -
            flight.departuretime +
            TURNAROUND_TIME_IN_SECONDS +
            totalDuration < // Check if the total duration of the flight is less than the maximum flight duration
            MAX_FLIGHT_DURATION_IN_SECONDS &&
          flight.departuretime >
            schedule[lastIndex].arrivaltime + TURNAROUND_TIME_IN_SECONDS // Check if the departure time of the flight is after the arrival time of the last flight in the schedule
      );
    },
    /* staleTime: 1000 * 60 * 60, // 1 hour */
  });
