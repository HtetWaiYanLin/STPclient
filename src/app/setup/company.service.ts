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
export class CompanyService {

  constructor(private http: HttpClient, private ics: IntercomService, private ref: Reference) { }


  /** POST: add a new hero to the server */
  save(data: any): Observable<any> {
    return this.http.post<any>(this.ics._apiurl + 'serviceCompany/saveCompany', data, httpOptions).pipe(
      tap((hero: any) =>
        console.log(hero))
    );
  }

  /** DELETE: delete the hero from the server */
  delete(syskey: any | number): Observable<any> {
    const id = typeof syskey === 'number' ? syskey : syskey;
    const url = `${this.ics._apiurl}serviceCompany/deleteMenu?syskey=${syskey}`;
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

  getCompanyName(): Observable<any> {
    return this.http.get<any>(`${this.ics._apiurl}serviceCompany/getCompanyName`)
      .pipe(
        tap(response => console.log('fetched companyName ${response}'))
      );
  }
}
