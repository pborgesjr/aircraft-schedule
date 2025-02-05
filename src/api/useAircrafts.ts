import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "./axios";
import { AirCraft, AirCraftResponse } from "../types";

const fetchAircrafts = async (): Promise<AirCraft[]> => {
  try {
    const response = await axiosClient
      .get<AirCraftResponse[]>("/aircrafts")
      .then((res) => res.data);

    return response.map((aircraft) => ({ ...aircraft, schedule: [] }));
  } catch {
    throw new Error("Error fetching aircrafts");
  }
};

export const useAircrafts = () =>
  useQuery({
    queryKey: ["aircrafts"],
    queryFn: fetchAircrafts,
  });
