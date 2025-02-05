import { useState } from "react";
import { getToday } from "../utils";

export const DaySelector = () => {
  const [currentDay, setCurrentDay] = useState(0);

  return (
    <div className="flex flex-row items-center">
      <button
        disabled={currentDay === 0}
        onClick={() => setCurrentDay(currentDay - 1)}
      >{`<`}</button>
      <p>{getToday().toString()}</p>
      <button onClick={() => setCurrentDay(currentDay + 1)}>{`>`}</button>
    </div>
  );
};
