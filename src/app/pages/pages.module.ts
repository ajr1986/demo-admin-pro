import { NgModule } from '@angular/core';

import { ChartsComponent } from './charts/charts.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        ChartsComponent,
        PagesComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        ChartsComponent,
        PagesComponent
    ],
    imports: [
        SharedModule,
        PagesRoutingModule
    ]
})
export class PagesModule {}