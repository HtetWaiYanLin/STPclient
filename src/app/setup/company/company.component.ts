import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IntercomService } from '../../framework/intercom.service';
import { Reference } from '../../framework/reference';
import { CompanyService } from '../company.service';



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  _obj = {
    'syskey': '', 'autokey': 0, 'createddate': '', 'modifieddate': '', 'recordstatus': 0, 'usersyskey': 0, 't1': '', 't2': '', 't3': '',
    't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 't11': '', 't12': '', 't13': '', 't14': '', 't15': '', 't16': '',
    't17': '', 't18': '', 't19': '', 't20': '', 'n1': 0, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0, 'n6': '', 'n7': 0, 'n8': 0, 'n9': 0, 'n10': 0
  };
  imageurl: string;
  _fileName: any;
  _file: any;
  _uploadFileName: string;

  constructor(private http: HttpClient, private companyService: CompanyService, public snackBar: MatSnackBar,
    private ics: IntercomService, public ref: Reference, private _router: Router, private activeroute: ActivatedRoute) {
    // this.imageurl = this.ics._apiurl + 'file/uploadProfile';
    ics.rpbean$.subscribe(x => { });
    if (!ics.getRole() || ics.getRole() === 0) {
      this._router.navigate(['/login']);
    }
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


  goList(): void {
    this._router.navigate(['/companylist']);
  }

  goPost(): void {
    const json = this._obj;
    this.companyService.save(json).subscribe(
      data => {
        this.openSnackBar(data.msgDesc);
        console.log(JSON.stringify(data));
      },
      error => { },
      () => { }
    );
  }

  goNew(): void {
    this._obj = {
      'syskey': '', 'autokey': 0, 'createddate': '', 'modifieddate': '', 'recordstatus': 0, 'usersyskey': 0, 't1': '', 't2': '', 't3': '',
      't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 't11': '', 't12': '', 't13': '', 't14': '', 't15': '',
      't16': '', 't17': '', 't18': '', 't19': '', 't20': '', 'n1': 0, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0, 'n6': '', 'n7': 0, 'n8': 0,
      'n9': 0, 'n10': 0
    };
  }



  goDelete(syskey: number): void {
    this.companyService.delete(syskey).subscribe(data => {
      this.openSnackBar(data.msgDesc);
      this.goNew();
    },
      error => { },
      () => { });
  }


  goGet(syskey: number) {
    this.companyService.getdataBysyskey(syskey).subscribe(data => {
      this._obj = data;
      this._obj.t3 = this._obj.t3 + '';
    },
      error => { },
      () => { });
  }



  upload(url: string, files: File): Observable<any> {
    const fd = new FormData();
    fd.append('uploadedFile', files);
    return this.http.post(url, fd).pipe(
      tap((data: any) =>
        console.log(data))
    );
  }

  uploadedFile(event) {
    if (event.target.files.length === 1) {
      this._fileName = event.target.files[0].name;
      this._file = event.target.files[0];
      const index = this._fileName.lastIndexOf('.');
      let imagename = this._fileName.substring(index);
      imagename = imagename.toLowerCase();
      if (imagename === '.jpg' || imagename === '.jpeg' || imagename === '.png') {
        const url = this.ics._apiurl + 'file/fileupload?f=upload&fn=' + this._fileName + '&id=' + this.ics._profile.t1 + '&type=9';
        this.upload(url, this._file).subscribe(
          data => {
            if (data.code === 'SUCCESS') {
              this.openSnackBar('Upload Successful!');
              this._uploadFileName = data.fileName;
              this._fileName = '';
              this._obj.t6 = this._uploadFileName;
            } else {
              this.openSnackBar('Upload Unsuccessful!');
            }
          },
          error => { },
          () => { }
        );
      } else {
        this.openSnackBar('Choose Image Associated!');
      }
    } else {
      this.openSnackBar('Upload File!');
    }
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
