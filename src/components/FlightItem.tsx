import { FaPlaneDeparture, FaPlaneArrival, FaAngleRight } from "react-icons/fa";

export type FlightProps = {
  id: string;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
  onClick: (id: string) => void;
};

export const FlightItem = ({
  arrival,
  departure,
  destination,
  id,
  origin,
  onClick,
}: FlightProps) => {
  return (
    <button
      type="button"
      className="border-b-3 flex flex-col items-center py-4 px-4 w-full"
      onClick={() => onClick(id)}
    >
      <h2 className="font-bold text-lg">{id}</h2>

      <div className="mt-2 flex flex-row justify-between items-center w-full">
        <section
          className="flex flex-1 flex-col bg-white py-3 rounded-xl items-center"
          aria-label={`Departure from ${id}`}
        >
          <span className="font-semibold text-black">{origin}</span>
          <span className="text-black font-semibold">{departure}</span>
          <FaPlaneDeparture color="black" size={24} className="mt-2" />
        </section>
        <FaAngleRight size={32} className="flex-1" />
        <section
          className="flex flex-col flex-1 bg-white py-3 rounded-xl items-center"
          aria-label={`Arrival from ${id}`}
        >
          <span className="font-semibold text-black">{destination}</span>
          <span className="text-black font-semibold"> {arrival}</span>
          <FaPlaneArrival color="black" size={24} className="mt-2" />
        </section>
      </div>
    </button>
  );
};
