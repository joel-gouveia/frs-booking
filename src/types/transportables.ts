export interface TransportableResponse {
  key: number;
  name: string;
  transportables: {
    name: string;
    code: string;
    key: number;
  }[];
}
