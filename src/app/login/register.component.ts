import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import swal from "sweetalert";
import { UserService } from "../services/service.index";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

declare function init_plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [
        Validators.required,
        this.validatePassword
      ]),
      terms: new FormControl(false)
    });
  }

  validatePassword(confirmPassword) {
    if (!confirmPassword.root || !confirmPassword.root.controls) {
      return null;
    }

    if (confirmPassword.root.controls.password.value != confirmPassword.value) {
      return {
        errorPassword: true
      };
    }

    return null;
  }

  register() {
    if (!this.form.controls.terms.value) {
      swal("Important!", "You must accept the terms", "warning");
      return;
    }

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.userService.createUser(user).subscribe((resp: any) => {

      console.log(resp);
      swal("User created", resp.user.email, "success");
      this.router.navigate(['/login']);
    });
  }
}
