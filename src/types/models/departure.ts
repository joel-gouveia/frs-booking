export interface DepartureRequest {
  originCode: string;
  destinationCode: string;
}

export interface DepartureResponse {
  originCode?: string;
  destinationCode?: string;
  uuid: string;
  departureTime: string;
}
