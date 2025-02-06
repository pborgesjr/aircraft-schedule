import { FaAngleRight } from "react-icons/fa";
import { Flight } from "../types";

export type SelectedFlightProps = {
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
  const sectionStyle = isSelected
    ? "bg-black text-white"
    : "bg-white text-black";
  const headingColor = isSelected ? "text-black" : "text-white";
  const iconColor = isSelected ? "black" : "white";
  const buttonBackground = isSelected ? "bg-white" : "bg-black";

  return (
    <button
      type="button"
      className={`border-3 flex flex-col p-4 w-full ${buttonBackground}`}
      onClick={() => onSelect?.(ident)}
      aria-label={`Select flight ${ident}`}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className={`text-start ${headingColor} text-xl font-bold`}>
          Flight: {ident}
        </h2>
        {onRemove && (
          <span
            data-testid="remove-button"
            aria-label={`Remove flight ${ident}`}
            className="text-(--blood) px-3 py-1 rounded-xl border-(--blood) border-3 font-semibold"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(ident);
            }}
          >
            Remove
          </span>
        )}
      </div>

      <div className="mt-8 flex flex-row justify-between w-full items-center">
        <section
          data-testid="departure"
          aria-label={`Departure from ${origin} at ${readable_departure}`}
          className={`flex flex-col ${sectionStyle} py-3 px-7 rounded-xl`}
        >
          <span className="font-semibold" aria-hidden>
            {origin}
          </span>
          <span className="font-semibold" aria-hidden>
            {readable_departure}
          </span>
        </section>
        <FaAngleRight size={32} color={iconColor} />
        <section
          data-testid="arrival"
          aria-label={`Arrival at ${destination} at ${readable_arrival}`}
          className={`flex flex-col ${sectionStyle} py-3 px-7 rounded-xl`}
        >
          <span className="font-semibold" aria-hidden>
            {destination}
          </span>
          <span className="font-semibold" aria-hidden>
            {readable_arrival}
          </span>
        </section>
      </div>
    </button>
  );
};
