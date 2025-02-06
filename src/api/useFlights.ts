import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "./axios";
import { Flight } from "../types";
import {
  selectAvailableFlights,
  selectAvailableFlightsToReplace,
} from "./selectors";

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
      if (!data) return [];

      return selectedFlightID
        ? selectAvailableFlightsToReplace(data, schedule, selectedFlightID)
        : selectAvailableFlights(data, schedule);
    },
  });
