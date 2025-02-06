import { Fragment } from "react";
import { Flight } from "../types";
import { getPercentage, TURNAROUND_TIME_IN_SECONDS } from "../utils";

export type TimelineProps = {
  schedule?: Flight[];
};

export const Timeline = ({ schedule }: TimelineProps) => {
  let lastArrival = 0;

  return (
    <div className="mt-8">
      <div className="flex flex-row justify-between">
        <span className="font-semibold text-lg">00:00</span>
        <span className="font-semibold text-lg">12:00</span>
        <span className="font-semibold text-lg">23:59</span>
      </div>

      <div className="w-full h-12 bg-(--grey) flex">
        {schedule?.map((flight, index) => {
          const flightDuration = flight.arrivaltime - flight.departuretime;
          const flightWidth = getPercentage(flightDuration);

          const idleTime = flight.departuretime - lastArrival;
          const idleWidth = idleTime > 0 ? getPercentage(idleTime) : 0;
          const turnaroundWidth =
            index < schedule.length - 1
              ? getPercentage(TURNAROUND_TIME_IN_SECONDS)
              : 0;

          lastArrival =
            flight.arrivaltime +
            (index < schedule.length - 1 ? TURNAROUND_TIME_IN_SECONDS : 0);

          return (
            <Fragment key={flight.ident}>
              {idleWidth > 0 && (
                <div
                  className="bg-(--grey) h-full"
                  style={{ width: `${idleWidth}%` }}
                />
              )}

              <div
                className="bg-(--lime) h-full text-white flex items-center justify-center text-xs"
                style={{ width: `${flightWidth}%` }}
              />

              {turnaroundWidth > 0 && (
                <div
                  className="bg-(--purple) h-full"
                  style={{ width: `${turnaroundWidth}%` }}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
