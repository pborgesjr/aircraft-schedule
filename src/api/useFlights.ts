import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "./axios";
import { Flight } from "../types";

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

export const useFlights = () =>
  useQuery({
    queryKey: ["flights"],
    queryFn: fetchFlights,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
