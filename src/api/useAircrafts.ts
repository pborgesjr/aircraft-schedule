import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "./axios";
import { AirCraft } from "../types";

const fetchAircrafts = async () => {
  try {
    const response = await axiosClient
      .get<AirCraft[]>("/aircrafts")
      .then((res) => res.data);

    return response;
  } catch {
    throw new Error("Error fetching aircrafts");
  }
};

export const useAircrafts = () =>
  useQuery({
    queryKey: ["aircrafts"],
    queryFn: fetchAircrafts,
    staleTime: 1000 * 5, // 5 seconds
  });
