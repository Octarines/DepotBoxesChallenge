import { ILocation } from "./location.interface";
import { IPathway } from "./pathway.interface";

export interface IBoxLocation extends ILocation {
  id: number,
  type: string,
  gateway: string,
  acceptedContents: string[],
  path: IPathway,
  pathNode: ILocation
}
