import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  isEnabledBtn = false;
  constructor(private auth: AuthService, private router: Router) {}
  aSub: Subscription;

  ngOnInit(): void {}

  userNameFormControl = new FormControl(null, [Validators.required]);
  emailFormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
  ]);

  ngOnDestroy() {
    if (this.aSub) this.aSub.unsubscribe();
  }

  onSubmit() {
    this.isEnabledBtn = true;
    const user = {
      username: this.userNameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };
    this.aSub = this.auth.register(user).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: { registered: true },
        });
      },
      (err) => {
        console.log(err);
        this.isEnabledBtn = false;
      }
    );
  }
}
