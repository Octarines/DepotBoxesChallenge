import { ILocation } from "./location.interface";

export interface IWorkArea {
  name: string,
  width: number,
  height: number,
  storageLocations: ILocation []
}
