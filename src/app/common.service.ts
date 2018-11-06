import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IntercomService } from './framework/intercom.service';
import { Reference } from './framework/reference';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private ics: IntercomService, private ref: Reference) { }


  getState(): Observable<any> {
    return this.http.get<any>(`${this.ics._apiurl}serviceaddress/getDivision`)
      .pipe(
        tap(response => console.log(`fetched State ${response}`))
      );
  }

  getDistrict(key: string): Observable<any> {
    return this.http.get<any>(`${this.ics._apiurl}serviceaddress/getDistinctbyDiv?div=${key}`)
      .pipe(
        tap(response => console.log(`fetched District ${response}`))
      );
  }

  getTownship(key: string): Observable<any> {
    return this.http.get<any>(`${this.ics._apiurl}serviceaddress/getTownshipByDistinct?distinct=${key}`)
      .pipe(
        tap(response => console.log(`fetched Township ${response}`))
      );
  }

}
