import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBoxData } from './interfaces/box-data.interface';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private _httpClient: HttpClient) { }

  getInitialBoxData(): Observable<IBoxData> {
    return this._httpClient.get<IBoxData>(`${environment.services.boxmoveservice}/Box`)
  }
}
