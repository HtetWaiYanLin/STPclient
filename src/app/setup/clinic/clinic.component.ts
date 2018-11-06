import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IntercomService } from '../../framework/intercom.service';
import { Reference } from '../../framework/reference';
import { ClinicService } from '../clinic.service';
import { CommonService } from 'src/app/common.service';



@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  _obj = {
    'syskey': '', 'autokey': 0, 'created_date': '', 'modified_date': '', 'record_status': 0, 'user_syskey': 0, 't1': '', 't2': '', 't3': '',
    't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 't11': '', 't12': '', 't13': '', 't14': '', 't15': '', 't16': '',
    't17': '', 't18': '', 't19': '', 't20': '', 'n1': 0, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0, 'n6': 0, 'n7': 0, 'n8': 0, 'n9': 0, 'n10': 0
  };
  imageurl = '';
  _fileName: any;
  _file: any;
  _uploadFileName: string;
  flagupload = false;
  stateDivision: Array<Address>;
  district: Array<Address>;
  township: Array<Address>;
  myAngularxQrCode: string = null;

  constructor(private http: HttpClient, private clinicService: ClinicService, private commonService: CommonService,
    public snackBar: MatSnackBar, private ics: IntercomService, public ref: Reference, private _router: Router,
    private activeroute: ActivatedRoute) {
    ics.rpbean$.subscribe(x => { });
    if (!ics.getRole() || ics.getRole() === 0) {
      this._router.navigate(['/login']);
    } else {
      this.getState();
      this.myAngularxQrCode = 'Your QR code data string';
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
    this._router.navigate(['/industrylist']);
  }

  goPost(): void {
    const json = this._obj;
    this.clinicService.save(json).subscribe(
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
      'syskey': '', 'autokey': 0, 'created_date': '', 'modified_date': '', 'record_status': 0, 'user_syskey': 0, 't1': '', 't2': '',
      't3': '', 't4': '', 't5': '', 't6': '', 't7': '', 't8': '', 't9': '', 't10': '', 't11': '', 't12': '', 't13': '', 't14': '',
      't15': '', 't16': '', 't17': '', 't18': '', 't19': '', 't20': '', 'n1': 0, 'n2': 0, 'n3': 0, 'n4': 0, 'n5': 0, 'n6': 0, 'n7': 0,
      'n8': 0, 'n9': 0, 'n10': 0
    };
    this.flagupload = false;
    this.imageurl = '';
  }



  goDelete(syskey: number): void {
    this.clinicService.delete(syskey).subscribe(data => {
      this.openSnackBar(data.msgDesc);
      this.goNew();
    },
      error => { },
      () => { });
  }


  goGet(syskey: number) {
    this.clinicService.getdataBysyskey(syskey).subscribe(data => {
      this._obj = data;
      this._obj.t3 = this._obj.t3 + '';
      this.imageurl = this.getImageURL() + this._obj.t6;
      this.flagupload = true;
    },
      error => { },
      () => { });
  }


  getState() {
    this.commonService.getState().subscribe(data => {
      this.stateDivision = data;
    }, error => { },
      () => { });
  }

  getDistrict(key: string) {
    this.commonService.getDistrict(key).subscribe(data => {
      this.district = data;
    }, error => { },
      () => { });
  }

  getTownship(key: string) {
    this.commonService.getTownship(key).subscribe(data => {
      this.township = data;
    }, error => { },
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
              this.flagupload = true;
              this.imageurl = this.getImageURL() + this._obj.t6;
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


  getImageURL() {
    return this.ics._imageurl + 'smallImage/CompanyImage/';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }


}

enum Address {
  value,
  caption,
  t2
}
