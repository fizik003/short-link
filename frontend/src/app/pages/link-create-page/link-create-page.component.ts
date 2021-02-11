import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createLinkAction } from 'src/app/store/links/link.action';
import { CreateLinkRequestInterface } from 'src/app/store/types/createLink.interface';

@Component({
  selector: 'app-link-create-page',
  templateUrl: './link-create-page.component.html',
  styleUrls: ['./link-create-page.component.scss'],
})
export class LinkCreatePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  lSub: Subscription;

  constructor(private store: Store) {}

  reg = `(https?://)?([\\da-z.-]+)\\.([a-w.]{2,6})[/\\w .-]*/?`;

  ngOnInit(): void {
    this.form = new FormGroup({
      originLink: new FormControl(null, [
        Validators.required,
        // Validators.pattern(this.reg),
      ]),
      description: new FormControl(null, [Validators.required]),
      tags: new FormControl(null),
    });
  }

  ngOnDestroy() {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    const link: CreateLinkRequestInterface = {
      originLink: this.form.value.originLink,
      description: this.form.value.description,
      tags: this.form.value.tags,
    };

    this.store.dispatch(createLinkAction({ request: link }));
  }
}
