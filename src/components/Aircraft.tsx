type AircraftProps = {
  id: string;
  percentage: number;
};

export const Aircraft = ({ id, percentage }: AircraftProps) => {
  return (
    <div className="flex flex-col items-center border-2 border-white">
      <h2>{id}</h2>
      <p>({percentage} %)</p>
    </div>
  );
};
