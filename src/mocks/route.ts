import { RouteResponse } from "src/types/models/route";

const routes: RouteResponse[] = [
  {
    destination: { code: "SEL", name: "Sellin" },
    name: "Lauterbach - Sellin",
    origin: { code: "LTB", name: "Lauterbach" },
  },
  {
    destination: { code: "ABC", name: "AbcWOW" },
    name: "ABC - WOW",
    origin: { code: "WOW", name: "WOWAbc" },
  },
];

export const routeMocks = {
  routes,
};
