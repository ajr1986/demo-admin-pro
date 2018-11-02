import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { ChartsComponent } from './charts/charts.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';
import { IncrementComponent } from '../components/increment/increment.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        ChartsComponent,
        IncrementComponent,
        DoughnutChartComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        HospitalsComponent,
        DoctorsComponent,
        DoctorComponent,
        SearchComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        ChartsComponent,
        IncrementComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule {}