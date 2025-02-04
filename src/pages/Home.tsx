import { useFlights, useAircrafts } from "../api";
import { Aircraft, DaySelector, Flight } from "../components";

export const Home = () => {
  const { data: flights } = useFlights();
  const { data: aircrafts } = useAircrafts();
  return (
    <div className="flex flex-col border-2 border-blue-500 items-center justify-center">
      <DaySelector />

      <div className="flex flex-row border-2 border-red-500 w-full justify-center">
        <section className="flex-1 border-2 border-green-500">
          <h2 className="text-center">Aircrafts</h2>
          {aircrafts?.map((aircraft) => (
            <Aircraft percentage={0} id={aircraft.ident} />
          ))}
        </section>

        <section className="flex-1 border-2 border-yellow-500">
          <h1>implement later</h1>
        </section>

        <section className="flex flex-col overflow-scroll flex-1 h-full max-h-[80vh]">
          <h2 className="text-center">Flights</h2>
          {flights?.map((flight) => (
            <Flight
              arrival={flight.readable_arrival}
              departure={flight.readable_departure}
              id={flight.ident}
              destination={flight.destination}
              origin={flight.origin}
            />
          ))}
        </section>
      </div>
    </div>
  );
};
