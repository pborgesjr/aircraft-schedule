import { useFlights } from "../api";
import { DaySelector, Flight, SelectedFlight } from "../components";

export const Home = () => {
  const { data: flights } = useFlights();
  return (
    <div className="flex flex-col border-2 border-blue-500">
      <DaySelector />
      {flights?.map((flight) => (
        <Flight
          arrival={flight.readable_arrival}
          departure={flight.readable_departure}
          id={flight.ident}
          destination={flight.destination}
          origin={flight.origin}
        />
      ))}
      <SelectedFlight
        id="selected"
        arrival="09:00"
        departure="06:00"
        destination="XYZ"
        origin="ABC"
      />
    </div>
  );
};
