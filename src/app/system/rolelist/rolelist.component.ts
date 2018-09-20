import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { IntercomService } from '../../framework/intercom.service';


@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.css']
})
export class RolelistComponent implements OnInit {

  displayedColumns: string[] = ['No', 'Code', 'Name'];
  exampleDatabase: RoleList | null;
  data = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  _start = 0;
  _end = 10;
  _pageIndex = 1;


  constructor(private ics: IntercomService, private http: HttpClient, private _router: Router) {
    ics.rpbean$.subscribe(x => { });
    if (!ics.getRole() || ics.getRole() === 0) {
      this._router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.exampleDatabase = new RoleList(this.http, this.ics);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          if (this.paginator.pageIndex === 0) {
            this._start = 0;
            this._end = 10;
            this._pageIndex = this.paginator.pageIndex;
          } else if (this.paginator.pageIndex === this._pageIndex + 1) {
            this._start = this._end + 1;
            this._end = this._end + 10;
            this._pageIndex = this.paginator.pageIndex;
          } else if (this.paginator.pageIndex === this._pageIndex - 1) {
            this._start = this._start - 10;
            this._end = this._end - 10;
            this._pageIndex = this.paginator.pageIndex;
          }
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRoleList(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this._start, this._end);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;
          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }


  goNew() {
    this._router.navigate(['/role', 'new']);
  }

  goEntry(syskey: number) {
    this._router.navigate(['/role', 'read', syskey]);
  }


}

export class RoleList {
  constructor(private http: HttpClient, private ics: IntercomService) { }
  getRoleList(sort: string, order: string, page: number, start: number, end: number): Observable<any> {
    const href = `${this.ics._apiurl}serviceRole/getRolelist`;
    const requestUrl =
      `${href}?sort=${sort}&order=${order}&page=${page + 1}&start=${start}&end=${end}`;

    return this.http.get<any>(requestUrl);
  }
}
