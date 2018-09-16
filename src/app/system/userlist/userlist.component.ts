import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { Reference } from '../../framework/reference';
import { SystemService } from '../system.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  displayedColumns: string[] = ['Code', 'User Name', 'Full Name', 'Email', 'Phone', 'Type', 'Company'];
  exampleDatabase: UserList | null;
  data = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  _start = 0;
  _end = 10;
  _pageIndex = 1;

  imageurl: string;

  constructor(private http: HttpClient, private _router: Router, public ref: Reference, public systemservice: SystemService) {
    this.systemservice.getCompanyName();
    this.imageurl = 'src/assets/images/taylor1.webp';
  }

  ngOnInit() {
    this.exampleDatabase = new UserList(this.http);

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
          return this.exampleDatabase!.getUserList(
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
    this._router.navigate(['/user', 'new']);
  }

  goEntry(syskey: number) {
    this._router.navigate(['/user', 'read', syskey]);
  }

  getCompanyName(companykey: string) {
    this.ref._lov3.companyname.forEach(element => {
      if (element.value === companykey.toString()) {
        return element.caption;
      }
    });
  }

}


export class UserList {
  constructor(private http: HttpClient) { }

  getUserList(sort: string, order: string, page: number, start: number, end: number): Observable<any> {
    const href = 'http://localhost:8085/stpserver/module001/serviceUser/getUserlist';
    const requestUrl =
      `${href}?sort=${sort}&order=${order}&page=${page + 1}&start=${start}&end=${end}`;
    return this.http.get<any>(requestUrl);
  }
}
