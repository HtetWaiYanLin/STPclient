import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { SystemService } from '../system.service';
import { Reference } from '../../framework/reference';

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

  constructor(public snackBar: MatSnackBar, private _router: Router, private systemservice: SystemService, private ref: Reference) {
    this.getMainMenu();
    this._obj.n1 = 1;
  }

  ngOnInit() {
    this.checkMenuType(this._obj.n1);
  }

  goList() {
    this._router.navigate(['/menulist']);
  }

  checkMenuType(data: number) {
    if (data === 1) {
      this._obj.t1 = '/stp';
      this._isMain = true;
    } else if (data === 2) {
      this._obj.t1 = '';
      this._isMain = false;
    }
  }


  getMainMenu(): void {
    this.systemservice.getmainMenu()
      .subscribe(menu => this.ref._lov3.mainmenu = menu.data);
  }

  goPost(): void {
    const json = this._obj;
    this.systemservice.saveMenu(json).subscribe(
      data => {
        this.openSnackBar(data.msgDesc);
        console.log(JSON.stringify(data));
      },
      error => { },
      () => { }
    );
  }

  goNew() {
    this._obj = {
      'syskey': 0, 'autokey': 0, 'createddate': '', 'modifieddate': '', 'recordstatus': 0, 'usersyskey': 0, 't1': '', 't2': '', 't3': '',
      't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 'n1': 1, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0, 'n6': 0,
      'n7': 0, 'n8': 0, 'n9': 0, 'n10': 0
    };
    this.checkMenuType(this._obj.n1);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
