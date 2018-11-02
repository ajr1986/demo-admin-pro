import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalComponent } from '../components/modal/modal.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        PagenotfoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalComponent
    ],
    exports: [
        PagenotfoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalComponent
    ]
})
export class SharedModule {}