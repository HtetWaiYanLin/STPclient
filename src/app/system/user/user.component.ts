import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  master = false;
  admin = false;
  content_writer = false;

  constructor() { }

  ngOnInit() {
  }

}
