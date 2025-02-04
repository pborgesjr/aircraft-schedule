type SelectedFlightProps = {
  id: string;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
};

export const SelectedFlight = ({
  arrival,
  departure,
  destination,
  id,
  origin,
}: SelectedFlightProps) => {
  return (
    <div className="border-1 flex flex-col p-4">
      <h2 className="text-start">Flight: {id}</h2>

      <div className="mt-4 flex flex-row justify-between w-full">
        <section className="flex flex-col">
          <span>{origin}</span>
          <span>{departure}</span>
        </section>
        <span>{`->`}</span>
        <section className="flex flex-col">
          <span>{destination}</span>
          <span>{arrival}</span>
        </section>
      </div>
    </div>
  );
};
