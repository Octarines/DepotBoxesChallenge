import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWorkArea } from './interfaces/work-area.interface';
import { environment } from 'src/environments/environment';
import { IBoxLocation } from './interfaces/box-location.interface';
import { IPathway } from './interfaces/pathway.interface';
import { INode } from './interfaces/node.interface';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private _httpClient: HttpClient) { }

  getWorkArea(): Observable<IWorkArea> {
    return this._httpClient.get<IWorkArea>(`${environment.services.boxmoveservice}/WorkArea`)
  }

  getLocations(): Observable<IBoxLocation[]> {
    return this._httpClient.get<IBoxLocation[]>(`${environment.services.boxmoveservice}/Location`)
  }

  getPathways(): Observable<IPathway[]> {
    return this._httpClient.get<IPathway[]>(`${environment.services.boxmoveservice}/Route/Path`)
  }

  getNodes(): Observable<INode[]> {
    return this._httpClient.get<INode[]>(`${environment.services.boxmoveservice}/Route/Node`)
  }
}
