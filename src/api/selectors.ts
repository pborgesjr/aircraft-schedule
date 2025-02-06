import { Flight } from "../types";
import {
  getTotalDuration,
  MAX_FLIGHT_DURATION_IN_SECONDS,
  TURNAROUND_TIME_IN_SECONDS,
} from "../utils";

export const selectAvailableFlights = (data: Flight[], schedule: Flight[]) => {
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
};

export const selectAvailableFlightsToReplace = (
  data: Flight[],
  schedule: Flight[],
  selectedFlightID: string
) => {
  if (schedule.length < 2) {
    // If the schedule has less than 2 flights, return all flights
    return data;
  }

  const flightToBeReplaced = schedule.find(
    (flight) => flight.ident === selectedFlightID
  );

  const flightToBeReplacedIndex = schedule.findIndex(
    (flight) => flight.ident === selectedFlightID
  );

  const dataWithoutFlight = data.filter(
    (item) => item.ident !== selectedFlightID
  );

  /** first flight case */
  if (flightToBeReplacedIndex === 0) {
    return dataWithoutFlight.filter(
      (flight) =>
        flight.destination === flightToBeReplaced?.destination && // Check if it has the same destination
        flight.arrivaltime -
          flight.departuretime +
          TURNAROUND_TIME_IN_SECONDS +
          getTotalDuration(
            schedule.filter((element) => element.ident !== selectedFlightID)
          ) < // Check if the total duration of the flight is less than the maximum flight duration
          MAX_FLIGHT_DURATION_IN_SECONDS &&
        flight.arrivaltime + TURNAROUND_TIME_IN_SECONDS <
          schedule[flightToBeReplacedIndex + 1]?.departuretime // Check if the arrival time of the flight is before the departure time of the next flight
    );
  }

  /** last flight case */
  if (flightToBeReplacedIndex === schedule.length - 1) {
    return dataWithoutFlight.filter(
      (flight) =>
        flight.origin === flightToBeReplaced?.origin && // Check if the origin of the flight is the same as the destination of the last flight in the schedule
        flight.arrivaltime -
          flight.departuretime +
          TURNAROUND_TIME_IN_SECONDS +
          getTotalDuration(
            schedule.filter((element) => element.ident !== selectedFlightID)
          ) < // Check if the total duration of the flight is less than the maximum flight duration
          MAX_FLIGHT_DURATION_IN_SECONDS &&
        flight.departuretime >
          schedule[flightToBeReplacedIndex - 1].arrivaltime +
            TURNAROUND_TIME_IN_SECONDS // Check if the departure time of the flight is after the arrival time of the last flight in the schedule
    );
  }

  /** flight in the middle case */
  return dataWithoutFlight.filter(
    (flight) =>
      flight.origin === flightToBeReplaced?.origin && // Check if the origin is the same
      flight.destination === flightToBeReplaced.destination && // Check if the destination is the same
      flight.arrivaltime -
        flight.departuretime +
        TURNAROUND_TIME_IN_SECONDS +
        getTotalDuration(
          schedule.filter((element) => element.ident !== selectedFlightID)
        ) <
        MAX_FLIGHT_DURATION_IN_SECONDS &&
      flight.departuretime + TURNAROUND_TIME_IN_SECONDS >
        schedule[flightToBeReplacedIndex - 1].arrivaltime && // Check if the departure time is after the arrival time of the previous flight
      flight.arrivaltime + TURNAROUND_TIME_IN_SECONDS <
        schedule[flightToBeReplacedIndex + 1].departuretime // Check if the arrival time is before the departure time of the next flight
  );
};
