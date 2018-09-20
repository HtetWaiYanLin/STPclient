import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { IntercomService } from '../../framework/intercom.service';
import { SystemService } from '../system.service';
import { Reference } from '../../framework/reference';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  _obj = {
    'syskey': 0, 'autokey': 0, 'createddate': '', 'modifieddate': '', 'recordstatus': 0, 'usersyskey': 0, 't1': '', 't2': '', 't3': '',
    't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 'n1': 0, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0, 'n6': 0,
    'n7': 0, 'n8': 0, 'n9': 0, 'n10': 0
  };
  _isMain = false;
  _isDelete = true;
  menunameFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();


  constructor(private ics: IntercomService, public snackBar: MatSnackBar, private _router: Router,
    private systemservice: SystemService, public ref: Reference,
    private activeroute: ActivatedRoute) {
    this.ics.rpbean$.subscribe(x => { });
    if (!ics.getRole() || ics.getRole() === 0) {
      this._router.navigate(['/login']);
    }
    this._obj.n2 = 1;
    this.getMainMenu();

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


  checkMenuType(data: number) {
    if (data === 1) {
      this._obj = {
        'syskey': 0, 'autokey': 0, 'createddate': '', 'modifieddate': '', 'recordstatus': 0, 'usersyskey': 0, 't1': '', 't2': '/stp',
        't3': '', 't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 'n1': 1, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0,
        'n6': 0, 'n7': 0, 'n8': 0, 'n9': 0, 'n10': 0
      };
      this._isMain = true;
    } else if (data === 2) {
      this._obj = {
        'syskey': 0, 'autokey': 0, 'createddate': '', 'modifieddate': '', 'recordstatus': 0, 'usersyskey': 0, 't1': '', 't2': '',
        't3': '', 't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 'n1': 2, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0,
        'n6': 0, 'n7': 0, 'n8': 0, 'n9': 0, 'n10': 0
      };
      this._isMain = false;
    }
  }


  getMainMenu(): void {
    this.systemservice.getmainMenu()
      .subscribe(menu => this.ref._lov3.mainmenu = menu.data);
  }

  getRoleCombo(): void {
    this.systemservice.getRolecombo()
      .subscribe(role => this.ref._lov3.role = role.data);
  }

  goPost(): void {
    const json = this._obj;
    this.systemservice.saveMenu(json).subscribe(
      data => {
        this.openSnackBar(data.msgDesc);
        if (data.state) {
          this.goGet(data.keyResult);
        }
      },
      error => { },
      () => { }
    );
  }

  goNew(): void {
    this._isDelete = true;
    this._obj = {
      'syskey': 0, 'autokey': 0, 'createddate': '', 'modifieddate': '', 'recordstatus': 0, 'usersyskey': 0, 't1': '', 't2': '', 't3': '',
      't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 'n1': 1, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0, 'n6': 0,
      'n7': 0, 'n8': 0, 'n9': 0, 'n10': 0
    };
    this._obj.n1 = 1;
    this.checkMenuType(this._obj.n1);
  }

  goList(): void {
    this._router.navigate(['/menulist']);
  }


  goDelete(syskey: number): void {
    this.systemservice.deleteMenu(syskey).subscribe(data => {
      this.openSnackBar(data.msgDesc);
      this.goNew();
    },
      error => { },
      () => { });
  }


  goGet(syskey: number) {
    this.systemservice.getMenu(syskey).subscribe(data => {
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
