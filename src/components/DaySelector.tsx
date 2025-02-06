import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { getToday } from "../utils";

export const DaySelector = () => {
  return (
    <div className="flex flex-row items-center justify-center py-6">
      <FaChevronLeft size={24} aria-label="Previous day button" />

      <p className="mx-8 text-xl font-semibold" aria-label="Today text">
        {getToday().toString()}
      </p>

      <FaChevronRight size={24} aria-label="Next day button" />
    </div>
  );
};
