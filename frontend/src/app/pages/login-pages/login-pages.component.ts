import { isSubmittingSelector } from './../../store/selectors';
import { LoginRequestInterface } from './../../store/types/loginRequest.interface';
import { loginAction } from './../../store/actions/login.action';
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
import { Subscription, Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.scss'],
})
export class LoginPagesComponent implements OnInit, OnDestroy {
  isEnabledBtn: boolean = false;
  aSub: Subscription;
  isSubmitting$: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  onSubmit = () => {
    const user: LoginRequestInterface = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };

    // this.aSub = this.auth.login(user).subscribe(
    //   () => {

    //     this.router.navigate(['/main']);
    //   },
    //   (err) => {
    //     MaterializeServices.tooast(err.error.message);
    //     this.isEnabledBtn = false;
    //     console.log(err);
    //   }
    // );

    this.store.dispatch(loginAction({ request: user }));
    console.log(user);
  };

  ngOnDestroy(): void {
    // if (this.aSub) this.aSub.unsubscribe();
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

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
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
