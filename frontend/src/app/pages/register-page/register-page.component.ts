import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  isEnabledBtn = false;
  constructor() {}

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

  onSubmit() {}
}
