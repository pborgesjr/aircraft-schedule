import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useFlights, useAircrafts } from "../api";
import {
  Aircraft,
  DaySelector,
  FlightItem,
  SelectedFlight,
  Timeline,
} from "../components";
import type { AirCraft, Flight } from "../types";
import { replaceElementWithoutMutating } from "../utils";

export const Home = () => {
  const [selectedAircraftID, setSelectedAircraftID] = useState("");
  const [selectedFlightID, setSelectedFlightID] = useState<string | undefined>(
    undefined
  );

  const { data: aircrafts } = useAircrafts();

  const selectedAircraft = aircrafts?.find(
    (elem) => elem.ident === selectedAircraftID
  );

  const { data: flights } = useFlights({
    schedule: selectedAircraft?.schedule,
    selectedFlightID,
  });

  const queryClient = useQueryClient();

  const handleSelectFlight = (flightID: string) =>
    setSelectedFlightID((prevState) =>
      prevState === flightID ? undefined : flightID
    );

  const handleRemove = (flightID: string, removeAll?: boolean) => {
    if (flightID === selectedFlightID || removeAll) {
      setSelectedFlightID(undefined);
    }

    queryClient.setQueryData(["aircrafts"], (data: AirCraft[]) => {
      return data.map((aircraft) => {
        if (aircraft.ident === selectedAircraftID) {
          return {
            ...aircraft,
            schedule: removeAll
              ? []
              : aircraft.schedule.filter((flight) => flight.ident !== flightID),
          };
        }
        return aircraft;
      });
    });
  };

  const handleAddFlight = (flightID: string) => {
    const flightToBeAdded = flights?.find(
      (flight) => flight.ident === flightID
    );
    queryClient.setQueryData(["aircrafts"], (data: AirCraft[]) => {
      return data.map((aircraft) => {
        if (aircraft.ident === selectedAircraftID && flightToBeAdded) {
          if (selectedFlightID) {
            const flightIndexToBeReplaced = aircraft.schedule.findIndex(
              (elem) => elem.ident === selectedFlightID
            );
            return {
              ...aircraft,
              schedule: replaceElementWithoutMutating<Flight>(
                flightIndexToBeReplaced,
                flightToBeAdded,
                aircraft.schedule
              ),
            };
          }

          return {
            ...aircraft,
            schedule: [...aircraft.schedule, flightToBeAdded],
          };
        }
        return aircraft;
      });
    });
    setSelectedFlightID(undefined);
  };
  return (
    <div className="min-h-[100vh] flex flex-col">
      <DaySelector />
      <div className="flex flex-row flex-1 gap-4 mt-10">
        <div className="flex flex-1 flex-col h-[80vh]">
          <h3 className="text-center text-xl font-semibold">Aircrafts</h3>
          <div className="border-4 border-(--lime) flex flex-col items-center h-full overflow-y-auto gap-2 mt-6">
            {aircrafts?.map((aircraft) => (
              <Aircraft
                key={aircraft.ident}
                aircraft={aircraft}
                onClick={() => setSelectedAircraftID(aircraft.ident)}
                isSelected={aircraft.ident === selectedAircraftID}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col h-[80vh]">
          <h3 className="text-center text-xl font-semibold">
            Rotation {selectedAircraftID}
          </h3>
          <div className="flex flex-col items-center h-full overflow-y-auto gap-3 mt-6">
            {selectedAircraft?.schedule.map((flight, index) => (
              <SelectedFlight
                {...flight}
                key={flight.ident}
                isSelected={flight.ident === selectedFlightID}
                onSelect={handleSelectFlight}
                onRemove={
                  index === 0 || index === selectedAircraft.schedule.length - 1
                    ? handleRemove
                    : undefined
                }
              />
            ))}
          </div>

          <Timeline schedule={selectedAircraft?.schedule} />
        </div>

        <div className="flex flex-1 flex-col h-[80vh]">
          <h3 className="text-center text-xl font-semibold">Flights</h3>
          <div className="border-4 border-(--lime) flex flex-col items-center h-full overflow-y-auto mt-6">
            {flights?.map((flight) => (
              <FlightItem
                key={flight.ident}
                arrival={flight.readable_arrival}
                departure={flight.readable_departure}
                id={flight.ident}
                destination={flight.destination}
                origin={flight.origin}
                onClick={handleAddFlight}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
