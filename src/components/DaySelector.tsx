import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { getToday } from "../utils";

export const DaySelector = () => {
  return (
    <div className="flex flex-row items-center justify-center py-6">
      <FaChevronLeft size={24} />

      <p className="mx-8 text-xl font-semibold">{getToday().toString()}</p>

      <FaChevronRight size={24} />
    </div>
  );
};
