import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuardGuard,
  UploadService,
  HospitalService,
  DoctorService,
  AdminGuard,
  ValidateTokenGuard
} from "./service.index";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuardGuard,
    UploadService,
    HospitalService,
    DoctorService,
    AdminGuard,
    ValidateTokenGuard
  ]
})
export class ServiceModule {}
