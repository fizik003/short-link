import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-link-create-page',
  templateUrl: './link-create-page.component.html',
  styleUrls: ['./link-create-page.component.scss'],
})
export class LinkCreatePageComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  reg = `(https?://)?([\\da-z.-]+)\\.([a-w.]{2,6})[/\\w .-]*/?`;

  ngOnInit(): void {
    this.form = new FormGroup({
      originLink: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.reg),
      ]),
      describe: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {}
}
