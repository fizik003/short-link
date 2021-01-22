import { LinkResponseInterface } from './../../store/types/linkResponse.interface';
import { currentUserSelector } from './../../store/selectors';
import { switchMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
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
  paramsSubscription: Subscription;
  linkSubscription: Subscription;
  linkId: number;
  link: LinkResponseInterface;
  isLoading = false;
  isEmpty = false;
  form: FormGroup;
  isEdit = false;
  isCanEdit = false;

  constructor(
    private route: ActivatedRoute,
    private linkServices: LinksService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // this.isLoading = true;

    this.paramsSubscription = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.store.pipe(
            select(currentUserSelector),
            map((currentUser) => {
              if (currentUser) {
                const currentLink = currentUser.links.find((link) => {
                  return link.id == params['id'];
                });

                return currentLink;
              }
            })
          );
        })
      )
      .subscribe(
        (link) => {
          if (link) {
            this.link = link;
          }
        },
        (err) => console.log(err.message)
      );

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.linkId = params['id'];
    });

    // this.getLinkById(this.linkId);
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) this.paramsSubscription.unsubscribe();
    if (this.linkSubscription) this.linkSubscription.unsubscribe();
  }

  initFrom() {
    const strTags = this.link.Tags.map((el) => el.name).join(',');
    this.form = new FormGroup({
      description: new FormControl(this.link.description, [
        Validators.required,
      ]),
      tags: new FormControl(strTags, [Validators.required]),
    });
  }

  showEditForm() {
    this.isEdit = !this.isEdit;
  }

  onSubmit() {
    this.isLoading = true;
    const linkData = {
      linkId: this.link.id,
      description: this.form.value.description,
      tags: this.form.value.tags,
    };

    this.linkServices.update(linkData).subscribe(
      (updateLink) => {
        // this.isLoading = false;
        // this.isEditDescription = false;
        // this.link = updateLink;
        // this.getLinkById(this.linkId);
        this.isEdit = false;
      },
      (error) => {
        this.form.patchValue({ description: this.link.description });
        MaterializeServices.tooast(error.error.message);
      }
    );
  }

  onClickLink() {
    this.link.clicks += 1;
  }

  // getLinkById(id: number) {
  //   this.linkSubscription = this.linkServices.getByLinkId(id).subscribe(
  //     (link: LinkFromServer) => {
  //       this.isLoading = false;
  //       this.link = link;
  //       this.initFrom();
  //     },
  //     (error) => {
  //       if (error.status === 404) {
  //         this.isEmpty = true;
  //         this.isLoading = false;
  //         MaterializeServices.tooast('У вас нет такой ссылки');
  //       }
  //     }
  //   );
  // }
}
