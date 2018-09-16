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



const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  { path: 'role', component: RoleComponent },
  { path: 'role/:cmd', component: MenuComponent },
  { path: 'role/:cmd/:id', component: MenuComponent },
  { path: 'rolelist', component: RolelistComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu/:cmd', component: MenuComponent },
  { path: 'menu/:cmd/:id', component: MenuComponent },
  { path: 'menulist', component: MenulistComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:cmd', component: UserComponent },
  { path: 'user/:cmd/:id', component: UserComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'company/:cmd', component: CompanyComponent },
  { path: 'company/:cmd/:id', component: CompanyComponent },
  { path: 'companylist', component: CompanylistComponent },
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
  ],
  providers: [Reference, SystemService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
