import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterializeServices } from './../../shared/materialize/materialize.services';
import { LinkFromServer } from './../../shared/interfaces';
import { Subscription } from 'rxjs';
import { LinksService } from './../../shared/services/links.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-link-details-page',
  templateUrl: './link-details-page.component.html',
  styleUrls: ['./link-details-page.component.scss'],
})
export class LinkDetailsPageComponent implements OnInit, OnDestroy {
  rSub: Subscription;
  lSub: Subscription;
  linkId: number;
  link: LinkFromServer;
  isLoading = false;
  isEmpty = false;
  form: FormGroup;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private linkServices: LinksService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.rSub = this.route.params.subscribe((params: Params) => {
      this.linkId = params['id'];
    });

    this.lSub = this.linkServices.getByLinkId(this.linkId).subscribe(
      (link: LinkFromServer) => {
        this.isLoading = false;
        this.link = link;
        this.initFrom();
      },
      (error) => {
        if (error.status === 404) {
          this.isEmpty = true;
          this.isLoading = false;
          MaterializeServices.tooast('У вас нет такой ссылки');
        }
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.rSub) this.rSub.unsubscribe();
    if (this.lSub) this.lSub.unsubscribe();
  }

  initFrom() {
    this.form = new FormGroup({
      description: new FormControl(this.link.description, [
        Validators.required,
      ]),
    });
  }

  showEditForm() {
    this.isEdit = !this.isEdit;
  }

  onSubmit() {}
}
