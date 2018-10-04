import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { IntercomService } from '../../framework/intercom.service';
import { AddressService } from '../address.service';
import { Reference } from '../../framework/reference';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-township',
  templateUrl: './township.component.html',
  styleUrls: ['./township.component.css']
})
export class TownshipComponent implements OnInit {

  _obj = {
    'errorcode': '', 'errormessage': '', 'division': '', 'distric': '', 'township': '', 'isLocal': 0, 'despMyan': '',
    'despEng': '', 'maxLon': '', 'minLat': '', 'minLon': '', 'maxLat': '', 'code': 'TBA'
  };
  _isMain = false;
  _isDelete = true;
  menunameFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();


  constructor(private ics: IntercomService, public snackBar: MatSnackBar, private _router: Router,
    private addressservice: AddressService, public ref: Reference,
    private activeroute: ActivatedRoute) {
    this.ics.rpbean$.subscribe(x => { });
    if (!ics.getRole() || ics.getRole() === 0) {
      this._router.navigate(['/login']);
    }
    this.getState();

  }

  ngOnInit() {
    this.activeroute.params.subscribe(params => {
      const cmd = params['cmd'];
      if (cmd != null && cmd !== '' && cmd === 'new') {
        this.goNew();
      } else if (cmd != null && cmd !== '' && cmd === 'read') {
        const syskey = params['id'];
        this.goGet(syskey);
      } else {
        this.goNew();
      }
    });
  }



  getState(): void {
    this.addressservice.getState()
      .subscribe(division => this.ref._lov3.state = division);
  }

  getDistinct(statekey: string): void {
    this.addressservice.getDistinct(statekey)
      .subscribe(distinct => this.ref._lov3.distinct = distinct);
  }




  goPost(): void {
    const json = this._obj;
    this.addressservice.saveTownship(json).subscribe(
      data => {
        this.openSnackBar(data.errormessage);
        if (data.state) {
          // this.goGet(data.keyResult);
        }
      },
      error => { },
      () => { }
    );
  }

  goNew(): void {
    this._isDelete = true;
    this._obj = {
      'errorcode': '', 'errormessage': '', 'division': '', 'distric': '', 'township': '', 'isLocal': 0, 'despMyan': '',
      'despEng': '', 'maxLon': '', 'minLat': '', 'minLon': '', 'maxLat': '', 'code': 'TBA'
    };
  }

  goList(): void {
    this._router.navigate(['/townshiplist']);
  }


  goDelete(syskey: number): void {
    this.addressservice.delete(syskey).subscribe(data => {
      this.openSnackBar(data.msgDesc);
      this.goNew();
    },
      error => { },
      () => { });
  }


  goGet(syskey: number) {
    this.addressservice.getdataBysyskey(syskey).subscribe(data => {
      console.log(JSON.stringify(data));
      this._obj = data;
      this._isDelete = false;
    },
      error => { },
      () => { });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
