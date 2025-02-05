import { AirCraft } from "../types";
import { getAircraftUtilization, getTotalDuration } from "../utils";

type AircraftProps = {
  aircraft: AirCraft;
  onClick: VoidFunction;
};

export const Aircraft = ({ aircraft, onClick }: AircraftProps) => {
  const percentage =
    aircraft.schedule.length > 0
      ? getAircraftUtilization(getTotalDuration(aircraft.schedule))
      : "0 %";
  return (
    <button
      type="button"
      className="flex flex-col items-center border-2 border-white w-full"
      onClick={onClick}
    >
      <h2>{aircraft.ident}</h2>
      <p>{percentage}</p>
    </button>
  );
};
