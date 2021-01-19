import { MaterializeServices } from './../../shared/materialize/materialize.services';
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
        MaterializeServices.tooast(err.error.message);
        this.isEnabledBtn = false;
        console.log(err);
      }
    );
  };

  ngOnDestroy(): void {
    if (this.aSub) this.aSub.unsubscribe();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterializeServices.tooast('Теперь мы можете зайти в свой аккаунт');
      } else if (params['accessDenied']) {
        MaterializeServices.tooast('Для начала нужно авторизироваться');
      } else if (params['sessionFailed']) {
        MaterializeServices.tooast('Войдите еще раз');
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
