export type AirCraftResponse = {
  ident: string;
  type: string;
  economySeats: number;
  base: string;
};

export interface AirCraft extends AirCraftResponse {
  schedule: Flight[];
}

export type Flight = {
  ident: string;
  departuretime: number;
  arrivaltime: number;
  readable_departure: string;
  readable_arrival: string;
  origin: string;
  destination: string;
};
