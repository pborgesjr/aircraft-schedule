import { useState } from "react";

export const DaySelector = () => {
  const [currentDay, setCurrentDay] = useState(0);

  return (
    <div className="flex flex-row items-center">
      <button
        disabled={currentDay === 0}
        onClick={() => setCurrentDay(currentDay - 1)}
      >{`<`}</button>
      <p>{currentDay}</p>
      <button onClick={() => setCurrentDay(currentDay + 1)}>{`>`}</button>
    </div>
  );
};
