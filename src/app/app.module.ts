import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SystemService } from './system/system.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MenuComponent } from './system/menu/menu.component';
import { UserComponent } from './system/user/user.component';
import { RoleComponent } from './system/role/role.component';
import { MenulistComponent } from './system/menulist/menulist.component';
import { Reference } from './framework/reference';
import { CompanyComponent } from './setup/company/company.component';
import { CompanylistComponent } from './setup/companylist/companylist.component';
import { CompanyService } from './setup/company.service';
import { UserlistComponent } from './system/userlist/userlist.component';
import { RolelistComponent } from './system/rolelist/rolelist.component';
import { CreatejobComponent } from './jobs/createjob/createjob.component';
import { JoblistComponent } from './jobs/joblist/joblist.component';
import { LoginComponent } from './login/login.component';
import { TownshipComponent } from './setup/township/township.component';
import { TownshiplistComponent } from './setup/townshiplist/townshiplist.component';

import { ClinicService } from './setup/clinic.service';
import { ClinicComponent } from './setup/clinic/clinic.component';
import { CliniclistComponent } from './setup/cliniclist/cliniclist.component';
import { CommonService } from './common.service';

import { QRCodeModule } from 'angularx-qrcode';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'role', component: RoleComponent },
  { path: 'role/:cmd', component: RoleComponent },
  { path: 'role/:cmd/:id', component: RoleComponent },
  { path: 'rolelist', component: RolelistComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu/:cmd', component: MenuComponent },
  { path: 'menu/:cmd/:id', component: MenuComponent },
  { path: 'menulist', component: MenulistComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:cmd', component: UserComponent },
  { path: 'user/:cmd/:id', component: UserComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'industry', component: CompanyComponent },
  { path: 'industry/:cmd', component: CompanyComponent },
  { path: 'industry/:cmd/:id', component: CompanyComponent },
  { path: 'industrylist', component: CompanylistComponent },
  { path: 'createjobs', component: CreatejobComponent },
  { path: 'createjobs/:cmd', component: CreatejobComponent },
  { path: 'createjobs/:cmd/:id', component: CreatejobComponent },
  { path: 'joblist', component: JoblistComponent },
  { path: 'township', component: TownshipComponent },
  { path: 'township/:cmd', component: TownshipComponent },
  { path: 'township/:cmd/:id', component: TownshipComponent },
  { path: 'townshiplist', component: TownshiplistComponent },
  { path: 'clinic', component: ClinicComponent },
  { path: 'clinic/:cmd', component: ClinicComponent },
  { path: 'clinic/:cmd/:id', component: ClinicComponent },
  { path: 'cliniclist', component: CliniclistComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MenuComponent,
    UserComponent,
    RoleComponent,
    MenulistComponent,
    CompanyComponent,
    CompanylistComponent,
    UserlistComponent,
    RolelistComponent,
    CreatejobComponent,
    JoblistComponent,
    LoginComponent,
    TownshipComponent,
    TownshiplistComponent,
    ClinicComponent,
    CliniclistComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
    QRCodeModule,
  ],
  providers: [Reference, SystemService, CompanyService , ClinicService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
