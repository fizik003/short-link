import { isLoggedInSelector } from './../../../../store/user/user.selector';
import { LoginRequestInterface } from '../../../../store/types/loginRequest.interface';
// import { loginAction } from '../../../../store/actions/login.action';
import { loginAction } from '../../../../store/user/user.action';
import { MaterializeServices } from '../../../../services/materialize.services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  isEnabledBtn: boolean = false;
  isLoggedInSubscription: Subscription;
  isSubmitting$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  onSubmit = () => {
    const user: LoginRequestInterface = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };

    this.store.dispatch(loginAction({ request: user }));
  };

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) this.isLoggedInSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.store
      .pipe(select(isLoggedInSelector))
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['main']);
        }
      });

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
