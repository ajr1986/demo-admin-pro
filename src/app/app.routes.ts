import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: PagesComponent, loadChildren: './pages/pages.module#PagesModule' },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
