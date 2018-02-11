import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  model: any = {};
  loading = false;

  constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

  register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Zarejestrowano pomyślnie', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    const message = JSON.parse(error._body).message;
                  this.alertService.error(message);
                    this.loading = false;
                });
    }
}
