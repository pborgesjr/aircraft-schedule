type FlightProps = {
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
      className="border-1 flex flex-col items-center p-4"
      onClick={() => onClick(id)}
    >
      <h2>{id}</h2>

      <div className="mt-4 flex flex-row justify-between w-full">
        <section className="flex flex-col">
          <span>{origin}</span>
          <span>{departure}</span>
        </section>
        <section className="flex flex-col">
          <span>{destination}</span>
          <span>{arrival}</span>
        </section>
      </div>
    </button>
  );
};
