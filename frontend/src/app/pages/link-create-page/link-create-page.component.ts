import { Router } from '@angular/router';
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

  constructor(private linkService: LinksService, private router: Router) {}

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
    const link = {
      originLink: this.form.value.originLink,
      description: this.form.value.description,
      tags: this.form.value.tags,
    };

    console.log(link);

    this.lSub = this.linkService.create(link).subscribe(
      ({ link }) => {
        this.router.navigate([`/link/details/${link.id}`]);
      },
      (error) => {
        this.form.enable();
        MaterializeServices.tooast(error.error.message);
      }
    );
  }
}
