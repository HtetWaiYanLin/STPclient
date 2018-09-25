import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IntercomService } from '../framework/intercom.service';
import { Reference } from '../framework/reference';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient, private ics: IntercomService, private ref: Reference) { }

  save(data: any): Observable<any> {
    return this.http.post<any>(this.ics._apiurl + 'serviceCompany/saveCompany', data, httpOptions).pipe(
      tap((hero: any) =>
        console.log(hero))
    );
  }

  delete(syskey: any | number): Observable<any> {
    const id = typeof syskey === 'number' ? syskey : syskey;
    const url = `${this.ics._apiurl}serviceCompany/deleteCompany?syskey=${syskey}`;
    return this.http.get(url, httpOptions).pipe(
      tap(_ => console.log(`deleted company id=${id}`))
    );
  }

  getdataBysyskey(syskey: number): Observable<any> {
    const url = `${this.ics._apiurl}serviceCompany/readComapany?syskey=${syskey}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched company syskey=${syskey}`))
    );
  }

  getState(): Observable<any> {
    return this.http.get<any>(`${this.ics._apiurl}serviceRole/getRoleCombo`)
      .pipe(
        tap(response => console.log(`fetched role combo ${response}`))
      );
  }
}
