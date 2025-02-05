import { Flight } from "../types";

type SelectedFlightProps = {
  onRemove?: (flightID: string) => void;
  onSelect?: (flightID: string) => void;
  isSelected?: boolean;
} & Flight;

export const SelectedFlight = ({
  readable_arrival,
  readable_departure,
  destination,
  ident,
  origin,
  onRemove,
  onSelect,
  isSelected,
}: SelectedFlightProps) => {
  return (
    <button
      type="button"
      className={`border-1 flex flex-col p-4 w-full ${
        isSelected ? "bg-blue-100" : ""
      }`}
      onClick={() => onSelect?.(ident)}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="text-start">Flight: {ident}</h2>
        {onRemove && (
          <span
            className="bg-red-500 text-white px-2 py-0.5 rounded-md z-5"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(ident);
            }}
          >
            Remove
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-row justify-between w-full">
        <section className="flex flex-col">
          <span>{origin}</span>
          <span>{readable_departure}</span>
        </section>
        <span>{`->`}</span>
        <section className="flex flex-col">
          <span>{destination}</span>
          <span>{readable_arrival}</span>
        </section>
      </div>
    </button>
  );
};
