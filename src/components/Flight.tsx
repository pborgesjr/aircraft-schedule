type FlightProps = {
  id: string;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
};

export const Flight = ({
  arrival,
  departure,
  destination,
  id,
  origin,
}: FlightProps) => {
  return (
    <div className="border-1 flex flex-col items-center p-4">
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
    </div>
  );
};
