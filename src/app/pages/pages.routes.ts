import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartsComponent } from './charts/charts.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard, ValidateTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';

const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [ValidateTokenGuard], data: {title: 'Dashboard'} },
    { path: 'progress', component: ProgressComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Progress'} },
    { path: 'charts', component: ChartsComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Charts'} },
    { path: 'account-settings', component: AccountSettingsComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Account Settings'} },
    { path: 'promises', component: PromisesComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Promises'} },
    { path: 'rxjs', component: RxjsComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Rxjs'} },
    { path: 'profile', component: ProfileComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Profile'} },
    { path: 'search/:exp', component: SearchComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Search'} },
    // Admin
    { path: 'users', component: UsersComponent, canActivate: [AdminGuard, ValidateTokenGuard], data: {title: 'Admin Users'} },
    { path: 'hospitals', component: HospitalsComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Admin Hospitals'} },
    { path: 'doctors', component: DoctorsComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Admin Doctors'} },
    { path: 'doctor/:id', component: DoctorComponent, canActivate: [ValidateTokenGuard],  data: {title: 'Update Doctor'} },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
