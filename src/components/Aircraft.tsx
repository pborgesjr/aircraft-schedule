import { AirCraft } from "../types";
import { getPercentage, getTotalDuration } from "../utils";

type AircraftProps = {
  aircraft: AirCraft;
  onClick: VoidFunction;
  isSelected?: boolean;
};

export const Aircraft = ({ aircraft, onClick, isSelected }: AircraftProps) => {
  const percentage =
    aircraft.schedule.length > 0
      ? getPercentage(getTotalDuration(aircraft.schedule)) + " %"
      : "0 %";
  return (
    <div className="flex flex-col items-center border-b-3 border-white py-3 w-full">
      <button
        type="button"
        className={`border-white border-2 w-[50%] py-2 ${
          isSelected ? "bg-white" : ""
        }`}
        onClick={onClick}
        aria-label={`Select aircraft ${aircraft.ident}`}
      >
        <h2
          className={`font-bold ${isSelected ? "text-black" : "text-white"}`}
          aria-label="Aircraft ID"
        >
          {aircraft.ident}
        </h2>
        <p
          className={`font-semibold ${
            isSelected ? "text-black" : "text-white"
          }`}
          aria-label="Percentage of time scheduled"
        >
          {percentage}
        </p>
      </button>
    </div>
  );
};
