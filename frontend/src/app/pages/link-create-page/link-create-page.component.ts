import { Subscription } from 'rxjs';
import { MaterializeServices } from './../../shared/materialize/materialize.services';
import { LinksService } from './../../shared/services/links.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-link-create-page',
  templateUrl: './link-create-page.component.html',
  styleUrls: ['./link-create-page.component.scss'],
})
export class LinkCreatePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  lSub: Subscription;

  constructor(private linkService: LinksService) {}

  reg = `(https?://)?([\\da-z.-]+)\\.([a-w.]{2,6})[/\\w .-]*/?`;

  ngOnInit(): void {
    this.form = new FormGroup({
      originLink: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.reg),
      ]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy() {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    const link = {
      originLink: this.form.value.originLink,
      description: this.form.value.description,
    };
    this.lSub = this.linkService.create(link).subscribe(
      (obj) => {
        console.log(obj);
      },
      (error) => {
        this.form.enable();
        MaterializeServices.tooast(error.error.message);
      }
    );
  }
}
