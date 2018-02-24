import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    passwordForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.passwordForm = this.formBuilder.group({
            password: ''
        });
    }

    onSubmit(e: Event) {
        e.preventDefault();
        this.router.navigate(['reservation/overview']);
    }

}
