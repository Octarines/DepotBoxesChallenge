import { Injectable } from '@angular/core';
import { IBoxLocation } from './interfaces/box-location.interface';
import { IPathway } from './interfaces/pathway.interface';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  constructor() {}

  calculatePathNode(location: IBoxLocation, pathways: IPathway[]) {
    if(location.gateway === "left" || location.gateway === "right") {
      //location is on a vertical pathway
      const horizontalPathways = pathways.filter(pathway => pathway.x1 == pathway.x2);

      //pathway must be one same side of the location as its gate

      let possiblePathways: IPathway[]

      if(location.gateway === "left")
        possiblePathways = horizontalPathways.filter(pathway => pathway.x1 < location.x);
      else
        possiblePathways = horizontalPathways.filter(pathway => pathway.x1 > location.x);

      //which of the pathways is closer to the location
      let shortestDistance: number;
      let closestPathway: IPathway;

      possiblePathways.forEach(pathway => {
        const distance = Math.abs(location.x - pathway.x1);

        if(!!!shortestDistance || distance < shortestDistance) {
          shortestDistance = distance;
          closestPathway = pathway;
        }
      });

      location.path = closestPathway;
      location.pathNode = {
        x: closestPathway.x1,
        y: location.y + (location.height / 2)
      };
    } else {
      //location is on a horizontal path
      const verticalPathways = pathways.filter(pathway => pathway.y1 == pathway.y2);

      //pathway must be one same side of the location as its gate

      let possiblePathways: IPathway[]

      if(location.gateway === "top")
        possiblePathways = verticalPathways.filter(pathway => pathway.y1 < location.y);
      else
        possiblePathways = verticalPathways.filter(pathway => pathway.y1 > location.y);

      //which of the pathways is closer to the location
      let shortestDistance: number;
      let closestPathway: IPathway;

      possiblePathways.forEach(pathway => {
        const distance = Math.abs(location.y - pathway.y1);

        if(!!!shortestDistance || distance < shortestDistance) {
          shortestDistance = distance;
          closestPathway = pathway;
        }
      });

      location.path = closestPathway;
      location.pathNode = {
        y: closestPathway.y1,
        x: location.x + (location.width / 2)
      };
    }
  }
}
