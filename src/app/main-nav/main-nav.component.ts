import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  menudata: any =  [{
    left_menu: [{
      parent_menu: [{
        name: 'Setup',
        menu_index: 'setup',
        child_menu: [
          {
            name: 'Company',
            icon_name: 'business',
            menulink: '/company'
          },
          {
            name: 'Township',
            icon_name: 'business',
            menulink: '/company'
          }
        ]
      }
     ]
    }
    ]
  }
  ];

  constructor() {
    console.log(this.menudata);
  }

  ngOnInit() {
  }

}
