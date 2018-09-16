import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IntercomService } from '../framework/intercom.service';
import { Reference } from '../framework/reference';

import { CompanyService } from '../setup/company.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient, private ics: IntercomService, private ref: Reference, public companyService: CompanyService) { }


  /** POST: add a new hero to the server */
  saveMenu(data: any): Observable<any> {
    return this.http.post<any>(this.ics._apiurl + 'service001/saveMenu', data, httpOptions).pipe(
      tap((hero: any) =>
        console.log(hero))
    );
  }
  /** GET mainMenu from the server */
  getmainMenu(): Observable<any> {
    return this.http.get<any>('http://localhost:8085/stpserver/module001/service001/getMainMenuList')
      .pipe(
        tap(response => console.log('fetched mainmenu ${response}'))
      );
  }
  /** DELETE: delete the hero from the server */
  deleteMenu(syskey: any | number): Observable<any> {
    const id = typeof syskey === 'number' ? syskey : syskey;
    const url = `${this.ics._apiurl}service001/deleteMenu?syskey=${syskey}`;
    return this.http.get(url, httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`))
    );
  }
  /** GET menu by syskey. Will 404 if id not found */
  getMenu(syskey: number): Observable<any> {
    const url = `${this.ics._apiurl}service001/readMenu?syskey=${syskey}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched menu syskey=${syskey}`))
    );
  }


  /*  Start User  */
  saveUser(data: any): Observable<any> {
    return this.http.post<any>(this.ics._apiurl + 'serviceUser/saveUser', data, httpOptions).pipe(
      tap((response: any) =>
        console.log(response))
    );
  }

  deleteUser(syskey: any | number): Observable<any> {
    const id = typeof syskey === 'number' ? syskey : syskey;
    const url = `${this.ics._apiurl}serviceUser/deleteUser?syskey=${syskey}`;
    return this.http.get(url, httpOptions).pipe(
      tap(_ => console.log(`dekete user id=${id}`))
    );
  }

  getUserBysyskey(syskey: number): Observable<any> {
    const url = `${this.ics._apiurl}serviceUser/readUser?syskey=${syskey}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched user syskey=${syskey}`))
    );
  }

  getCompanyName(): void {
    this.companyService.getCompanyName()
      .subscribe(menu => this.ref._lov3.companyname = menu.data);
  }


  /*  End User  */

}
