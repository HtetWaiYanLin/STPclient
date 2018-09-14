import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { IntercomService } from './framework/intercom.service';
import { Reference } from './framework/reference';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  myData: any;
  constructor(private http: HttpClient, private _router: Router, private ics: IntercomService, private title: Title,
    private ref: Reference) {
    this.getAppinfo();
    this.getMockData1();
  }

  getAppinfo(): void {
    this.getAppdata().subscribe(data => {
      this.myData = data;
      this.ics._title = this.myData.title;
      this.ics._appname = this.myData.appname;
      this.title.setTitle(this.ics._title);
      this.ics._apiurl = this.myData.apiurl;
      this.ics._imageurl = this.myData.imageurl;
    },
      () => { }
    );
  }

  getMockData1(): void {
    this.getMockData().subscribe(data => {
      this.ref._lov3 = data;
    });
  }

  getAppdata(): Observable<AppData> {
    return this.http.get<AppData>('assets/config.json?random=' + Math.random());
  }

  getMockData(): Observable<any> {
    return this.http.get<any>('assets/lov3.json?random=' + Math.random());
  }
}
export interface AppData {
  _title: string;
  _appname: string;
  _apiurl: string;
  _imageurl: string;

}
