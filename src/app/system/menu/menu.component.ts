import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  _obj = { 'syskey': 0, 'autokey': 0, 'createdDate': '', 'modifiedDate': '', 'userSyskey': 0,
  'recordStatus': 0, 't1': '', 't2': '', 't3': '',
  'n1': 0, 'n2': 0, 'n3': 0 };

  constructor(private _router: Router) { }

  ngOnInit() {
  }



  goList() {
    this._router.navigate(['/menulist']);
  }


}
