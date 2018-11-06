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
export class ClinicService {

  constructor(private http: HttpClient, private ics: IntercomService, private ref: Reference) { }

  save(data: any): Observable<any> {
    return this.http.post<any>(this.ics._apiurl + 'serviceClinic/saveClinic', data, httpOptions).pipe(
      tap((hero: any) =>
        console.log(hero))
    );
  }

  delete(syskey: any | number): Observable<any> {
    const id = typeof syskey === 'number' ? syskey : syskey;
    const url = `${this.ics._apiurl}serviceClinic/deleteClinic?syskey=${syskey}`;
    return this.http.get(url, httpOptions).pipe(
      tap(_ => console.log(`deleted clinic id=${id}`))
    );
  }

  getdataBysyskey(syskey: number): Observable<any> {
    const url = `${this.ics._apiurl}serviceClinic/readClinic?syskey=${syskey}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched clinic syskey=${syskey}`))
    );
  }

  getclinicName(): Observable<any> {
    return this.http.get<any>(`${this.ics._apiurl}serviceClinic/getClinicName`)
      .pipe(
        tap(response => console.log('fetched clinicName ${response}'))
      );
  }
}
