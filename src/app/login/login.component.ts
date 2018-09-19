import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntercomService } from '../framework/intercom.service';
import { Bean } from '../framework/bean';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  showSpinner =  false;
  subscription: Subscription;

  constructor(private ics: IntercomService, private _router: Router) {
    this.subscription = ics.rpbean$.subscribe(x => { });
    this.ics._profile.role = 0;
    this.ics.sendBean(new Bean());
  }

  ngOnInit() {
  }

  login(): void {
     this.showSpinner = true;
    if (this.username ===  this.password) {
      this.ics._profile.role = 50;
      this.ics.sendBean(new Bean());
      this.showSpinner = false;
      this._router.navigate(['company']);
    } else {
      alert('Invalid Username or Password');
      this.showSpinner = false;
    }
  }


}
