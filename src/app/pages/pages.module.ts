import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { ChartsComponent } from './charts/charts.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';
import { IncrementComponent } from '../components/increment/increment.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        ChartsComponent,
        PagesComponent,
        IncrementComponent,
        DoughnutChartComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        ChartsComponent,
        PagesComponent,
        IncrementComponent
    ],
    imports: [
        SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule
    ]
})
export class PagesModule {}