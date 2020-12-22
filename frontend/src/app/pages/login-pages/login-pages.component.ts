import { AuthService } from './../../shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.scss'],
})
export class LoginPagesComponent implements OnInit, OnDestroy {
  isEnabledBtn = false;
  aSub: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit = () => {
    this.isEnabledBtn = true;

    const user = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };
    this.aSub = this.auth.login(user).subscribe(
      () => {
        this.router.navigate(['/main']);
      },
      (err) => {
        console.warn(err);
        this.isEnabledBtn = false;
      }
    );
  };

  ngOnDestroy(): void {
    if (this.aSub) this.aSub.unsubscribe();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Теперь мы можете зайти
      } else if (params['accessDenied']) {
        // Для начала нужно авторизироваться
      }
    });
  }

  emailFormControl = new FormControl(null, [
    Validators.email,
    Validators.required,
  ]);

  passwordFormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
  ]);
}
