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
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {


  _obj = {
    'syskey': 0, 'autokey': 0, 'createddate': '', 'modifieddate': '', 'recordstatus': 0, 'usersyskey': 0, 't1': '', 't2': '', 't3': '',
    't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 'n1': 0, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0, 'n6': 0,
    'n7': 0, 'n8': 0, 'n9': 0, 'n10': 0, 'menu': []
  };
  _isDelete = true;

  rolenameFormControl = new FormControl('', [
    Validators.required,
  ]);


  matcher = new MyErrorStateMatcher();

  // Menu_Data: any;

  constructor(private ics: IntercomService, public snackBar: MatSnackBar, private _router: Router,
    private systemservice: SystemService, public ref: Reference,
    private activeroute: ActivatedRoute) {
    this.ics.rpbean$.subscribe(x => { });
    if (!ics.getRole() || ics.getRole() === 0) {
      this._router.navigate(['/login']);
    }
    this.getRoleMenus();
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


  goPost(): void {
    const json = this._obj;
    this.systemservice.saveRole(json).subscribe(
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
      't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 'n1': 0, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0, 'n6': 0,
      'n7': 0, 'n8': 0, 'n9': 0, 'n10': 0, 'menu': []
    };
  }

  goList(): void {
    this._router.navigate(['/rolelist']);
  }


  goDelete(syskey: number): void {
    this.systemservice.deleteRole(syskey).subscribe(data => {
      this.openSnackBar(data.msgDesc);
      this.goNew();
    },
      error => { },
      () => { });
  }

  goGet(syskey: number) {
    this.systemservice.getRoleBysyskey(syskey).subscribe(data => {
      this._obj = data;
      this._isDelete = false;
    },
      error => { },
      () => { });
  }


  getRoleMenus(): void {
    this.systemservice.getRoleMenus().subscribe(data => {
      this._obj.menu = data.menu;
    },
      error => { },
      () => { });
  }

  getParentValue(indexno, value, event) {
    if (event.checked) {
      // if parentmenu is checked,check all childmenu
      if (this._obj.menu[indexno].childmenus !== undefined) {
        for (let i = 0; i < this._obj.menu[indexno].childmenus.length; i++) {
          this._obj.menu[indexno].childmenus[i].result = true;
        }
      }
    } else {
      // if parentmenu is not check, uncheck all childmenu
      if (this._obj.menu[indexno].childmenus !== undefined) {
        for (let i = 0; i < this._obj.menu[indexno].childmenus.length; i++) {
          this._obj.menu[indexno].childmenus[i].result = false;
        }
      }
    }
  }

  getChildValue(indexno, childindex, event) {
    if (event.checked) {
      // if one childmenu is checked, check its parentmenu
      this._obj.menu[indexno].result = true;
    } else {
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
