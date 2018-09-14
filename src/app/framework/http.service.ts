import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // constructor(private http: HttpClient) {
  // }
  // doGet(url: string) {
  //   return this.http.get(url).map(res => res.json());
  // }
  // doPost(url: string, j: any) {
  //   const params = JSON.stringify(j);
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(url, params, { headers: headers }).map(res => res.json());
  // }
  // upload(url: string, files: File) {
  //   const fd = new FormData();
  //   fd.append('file', files);
  //   return this.http.post(url, fd).map(res => res.json());
  // }
}
