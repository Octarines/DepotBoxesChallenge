import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { AfterViewInit, Component, ElementRef, getPlatform, OnInit, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs';
import { BoxService } from './box.service';
import { CalculationService } from './calculation.service';
import { IBoxLocation } from './interfaces/box-location.interface';
import { IBox } from './interfaces/box.interface';
import { ILocation } from './interfaces/location.interface';
import { INode } from './interfaces/node.interface';
import { IPathway } from './interfaces/pathway.interface';
import { ITask } from './interfaces/task.interface';
import { IWorkArea } from './interfaces/work-area.interface';
import { SiteService } from './site.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('siteCanvas')
  siteCanvas: ElementRef<HTMLCanvasElement>;

  public canvasContext: CanvasRenderingContext2D;

  title = 'Move-Boxer';

  workArea: IWorkArea;
  locations: IBoxLocation[];
  pathways: IPathway[];
  nodes: INode[];

  boxes: IBox[];
  tasks: ITask[];

  constructor(
    private _siteService: SiteService,
    private _boxService: BoxService,
    private _calculationService: CalculationService){}

  ngOnInit(): void {
    this._siteService.getWorkArea()
      .pipe(
        mergeMap(workArea => {
          this.workArea = workArea;
          return this._siteService.getLocations();
        }),
        mergeMap(locations => {
          this.locations = locations;
          return this._siteService.getNodes();
        }),
        mergeMap(nodes => {
          this.nodes = nodes;
          return this._siteService.getPathways();
        }),
        mergeMap(pathways => {
          this.pathways = pathways;
          this.renderSite();
          return this._boxService.getInitialBoxData();
        })
      )
      .subscribe(boxData => {
        this.boxes = boxData.boxes;
        this.renderBoxes();
        this.tasks = boxData.tasks.sort((a,b) => a.priority > b.priority ? 1 : -1);

        this.initialiseTasks();
        // this.moveBoxes();
      });
  }

  ngAfterViewInit(): void {
    this.canvasContext = this.siteCanvas.nativeElement.getContext('2d');
  }

  initialiseTasks() {
    this.calculateDistances(this.tasks.filter(task => !!task.boxId));
  }

  intialiseLocations() {
    this.locations.forEach(location => {
      this._calculationService.calculatePathNode(location, this.pathways);
      this.renderLocationPathNode(location.pathNode);
    });
  }

  renderSite() {
    this.workArea.storageLocations.forEach(s => {
      this.renderLocation(s, "white", true);
    });

    this.locations.forEach(l => {
      switch(l.type){
        case 'entry':
          this.renderLocation(l, "#99ffa2", true);
          break;
        case 'exit':
          this.renderLocation(l, "#ffab9e", true);
          break;
        case 'parking':
          this.renderLocation(l, "#9edbff", false);
          break;
        case 'bay':
          this.renderLocation(l, "lightgray", false);
          break;
      }
    })

    this.locations.forEach(l => {
      if(!!l.gateway) {
        this.renderGate(l);
      }
    })

    this.pathways.forEach(p => {
      this.renderPathway(p);
    })

    this.nodes.forEach(n => {
      this.renderNode(n);
    });
  }

  renderLocation(location: ILocation, colour: string, showTitle: boolean) {
    this.canvasContext.fillStyle = colour ?? "white";

    this.canvasContext?.fillRect(location.x, location.y, location.width, location.height);
    this.canvasContext?.strokeRect(location.x, location.y, location.width, location.height);

    if(showTitle) {
      this.canvasContext.font = '18px Arial';
      this.canvasContext.fillStyle = "black";
      this.canvasContext.textAlign = 'center';
      this.canvasContext. textBaseline = 'middle';
      this.canvasContext.fillText(location.name, location.x + (location.width/2), location.y + (location.height/2));
    }
  }

  renderGate(location: IBoxLocation) {
    let gatePositionX: number;
    let gatePositionY: number;

    switch(location.gateway) {
      case 'left' :
        gatePositionX = location.x;
        gatePositionY = location.y  + (location.height/2);
        break;
      case 'right' :
        gatePositionX = location.x + location.width;
        gatePositionY = location.y  + (location.height/2);
        break;
      case 'top' :
        gatePositionX = location.x + (location.width/2);
        gatePositionY = location.y;
        break;
      case 'bottom' :
        gatePositionX = location.x + (location.width/2);
        gatePositionY = location.y + location.height;
        break;
    }

    this.canvasContext.font = '18px Arial';
    this.canvasContext.fillStyle = "black";
    this.canvasContext.textAlign = 'center';
    this.canvasContext.textBaseline = 'middle';
    this.canvasContext.fillText("G", gatePositionX, gatePositionY);
  }

  renderPathway(pathway: IPathway) {
    this.canvasContext.lineWidth = 10;
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(pathway.x1, pathway.y1);
    this.canvasContext.lineTo(pathway.x2, pathway.y2);
    this.canvasContext.stroke();
  }

  renderNode(node: INode) {
    this.canvasContext.fillStyle = "green";

    this.canvasContext?.fillRect(node.x - 10, node.y - 10, 20, 20);
  }

  renderBoxes() {
    this.boxes.forEach(box => {
      const boxLocation = this.locations.find(x => x.id === box.locationId);
      if(boxLocation) {
        this.renderBox(box, boxLocation);
      }
    })
  }

  renderLocationPathNode(node: ILocation) {
    this.canvasContext.fillStyle = "purple";
    this.canvasContext?.fillRect(node.x - 5, node.y - 5, 10, 10);
  }

  renderBox(box: IBox, location: IBoxLocation) {
    this.canvasContext.lineWidth = 2;
    let boxColour: string;

    switch(box.contents){
      case 'empty':
        boxColour = 'white';
        break;
      case 'full':
        boxColour = 'green';
        break;
      case 'waste':
        boxColour = 'red';
        break;
    }

    this.canvasContext.fillStyle = boxColour;
    const boxWidth = 20;
    const boxHeight = 20;

    const boxXPosition = location.x + (location.width/2) - (boxWidth/2);
    const boxYPosition = location.y + (location.height/2) - (boxHeight/2);

    this.canvasContext?.fillRect(boxXPosition, boxYPosition, boxWidth, boxHeight);
    this.canvasContext?.strokeRect(boxXPosition, boxYPosition, boxWidth, boxHeight);
  }

  calculateDistances(tasks: ITask[]) {
    tasks.forEach(task => {
      switch(task.type) {
        case 'clear':
          const box = this.boxes.find(b => b.id === task.boxId);
          const bay = this.locations.find(l => l.id === box.locationId);

          let shortestPath: number;
          let closestBay: IBoxLocation;

          this.locations.filter(location => location.type === "parking").forEach(l => {
            const xDistance = Math.abs(l.x - bay.x);
            const yDistance = Math.abs(l.y - bay.y);

            const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

            if(!!!shortestPath || distance < shortestPath) {
              shortestPath = distance;
              closestBay = l;
            }
          })

          task.distance = shortestPath;
          task.targetBay = closestBay
          break;
      }
    })
  }
}
