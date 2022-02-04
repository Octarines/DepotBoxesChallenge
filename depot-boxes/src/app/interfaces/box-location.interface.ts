import { ILocation } from "./location.interface";

export interface IBoxLocation extends ILocation {
  id: number,
  type: string,
  gateway: string,
  acceptedContents: string[]
}
