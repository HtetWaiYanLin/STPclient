import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercomService {
  private _mybean: any;
  _apiurl = '';
  _rpturl = '';
  _title = '';
  _app = '';
  _appname = '';
  _imageurl = '';
  _profile = {
    'userName': '',
    'role': 0,
    'logoText': 'NG',
    'logoLink': 'Menu00',
    'commandCenter': 'true',
    'btndata': [],
    'menus': [],
    'rightMenus': [],
    'userid': '',
    't1': '',
    't2': '',
    't3': '',
    't4': '',
    'n1': 10
  };

   // Observable string sources
   private _channel001Source = new Subject<string>();
   private _channel002Source = new Subject<string>();
   private _channel003Source = new Subject<string>();
   private _rpbeanSource = new Subject<any>();

   // Observable string streams
   channel001$ = this._channel001Source.asObservable();
   channel002$ = this._channel002Source.asObservable();
   channel003$ = this._channel003Source.asObservable();
   rpbean$ = this._rpbeanSource.asObservable();
   // Service message commands
   send001(x: string) {
       this._channel001Source.next(x);
   }
   send002(x: string) {
       this._channel002Source.next(x);
   }
   send003(x: string) {
       this._channel003Source.next(x);
   }
   sendBean(x: any) {
       this._mybean = x;
       this._rpbeanSource.next(x);
   }
   getBean(): any {
       return this._mybean;
   }
   getRole(): number {
       return this._profile.role;
   }
   isMenuBar(): boolean {
       return this._profile.role > 0;
   }
}
