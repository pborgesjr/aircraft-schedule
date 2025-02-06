import { AirCraft, Flight } from "../types";

export const MOCK_FLIGHTS: Flight[] = [
  {
    readable_departure: "06:00",
    ident: "AS1001",
    origin: "LFSB",
    arrivaltime: 26100,
    destination: "LFMN",
    readable_arrival: "07:15",
    departuretime: 21600,
  },
  {
    readable_departure: "09:00",
    ident: "AS1002",
    origin: "LFMN",
    arrivaltime: 26000,
    destination: "B",
    readable_arrival: "10:30",
    departuretime: 25000,
  },
  {
    readable_departure: "06:00",
    ident: "AS1003",
    origin: "B",
    arrivaltime: 29000,
    destination: "C",
    readable_arrival: "07:15",
    departuretime: 28000,
  },
  {
    readable_departure: "06:00",
    ident: "AS1004",
    origin: "C",
    arrivaltime: 32000,
    destination: "D",
    readable_arrival: "07:15",
    departuretime: 31000,
  },
];

export const MOCK_AIRCRAFTS: AirCraft[] = [
  {
    ident: "ABC123",
    type: "A320",
    economySeats: 100,
    base: "EGKK",
    schedule: MOCK_FLIGHTS,
  },
];
