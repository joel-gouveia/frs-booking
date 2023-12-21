export interface IRoute {
  name: string;
  origin: Origin;
  destination: Destination;
}

export interface Origin {
  code: string;
  name: string;
}

export interface Destination {
  code: string;
  name: string;
}
