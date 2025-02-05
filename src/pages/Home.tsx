import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useFlights, useAircrafts } from "../api";
import {
  Aircraft,
  DaySelector,
  FlightItem,
  SelectedFlight,
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
      prevState === flightID ? "" : flightID
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
          /*           if (selectedFlightID) { //TODO: fix
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
          } */

          return {
            ...aircraft,
            schedule: [...aircraft.schedule, flightToBeAdded],
          };
        }
        return aircraft;
      });
    });
  };
  return (
    <div className="flex flex-col border-2 border-blue-500 items-center justify-center">
      <DaySelector />

      <div className="flex flex-row border-2 border-red-500 w-full justify-center">
        <section className="flex flex-col flex-1 border-2 border-green-500 gap-4">
          <h2 className="text-center">Aircrafts</h2>
          {aircrafts?.map((aircraft) => (
            <Aircraft
              key={aircraft.ident}
              aircraft={aircraft}
              onClick={() => setSelectedAircraftID(aircraft.ident)}
            />
          ))}
        </section>

        <section className="flex-1 border-2 border-yellow-500">
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
          {/*        {selectedAircraft && selectedAircraft.schedule.length > 1 && (
            <button
              className="bg-red-500 text-white px-2 py-0.5 rounded-md w-full mb-2"
              onClick={() => handleRemove(selectedAircraftID, true)}
            >
              Remove all
            </button>
          )} */}
        </section>

        <section className="flex flex-col overflow-scroll flex-1 h-full max-h-[80vh] gap-2">
          <h2 className="text-center">Flights</h2>
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
        </section>
      </div>
    </div>
  );
};
