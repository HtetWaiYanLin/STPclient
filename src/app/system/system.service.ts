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


  /** POST: add a new menu to the server */
  saveMenu(data: any): Observable<any> {
    return this.http.post<any>(this.ics._apiurl + 'service001/saveMenu', data, httpOptions).pipe(
      tap((response: any) =>
        console.log(response))
    );
  }

  /** GET mainMenu from the server */
  getmainMenu(): Observable<any> {
    return this.http.get<any>(`${this.ics._apiurl}service001/getMainMenuList`)
      .pipe(
        tap(response => console.log('fetched mainmenu ${response}'))
      );
  }

  /** DELETE: delete the menu from the server */
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



  /*  Start Role  */
  saveRole(data: any): Observable<any> {
    return this.http.post<any>(this.ics._apiurl + 'serviceRole/saveRole', data, httpOptions).pipe(
      tap((response: any) =>
        console.log(response))
    );
  }

  deleteRole(syskey: any | number): Observable<any> {
    const id = typeof syskey === 'number' ? syskey : syskey;
    const url = `${this.ics._apiurl}serviceRole/deleteRole?syskey=${syskey}`;
    return this.http.get(url, httpOptions).pipe(
      tap(_ => console.log(`dekete role id=${id}`))
    );
  }

  getRoleBysyskey(syskey: number): Observable<any> {
    const url = `${this.ics._apiurl}serviceRole/readRole?syskey=${syskey}`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched role syskey=${syskey}`))
    );
  }


  getRolecombo(): Observable<any> {
      return this.http.get<any>(`${this.ics._apiurl}serviceRole/getRoleCombo`)
        .pipe(
          tap(response => console.log(`fetched role combo ${response}`))
        );
  }

  getRoleMenus(): Observable<any> {
    return this.http.get<any>(`${this.ics._apiurl}serviceRole/getRoleMenus`)
      .pipe(
        tap()
      );
}

  /*  End Role  */

}
