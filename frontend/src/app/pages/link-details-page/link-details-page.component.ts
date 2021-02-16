import { userIsLoadingSelector } from './../../store/user/user.selector';
import {
  linksSelector,
  linksIsLoadingSelector,
} from './../../store/links/link.selector';
import { currentUserSelector } from '../../store/user/user.selector';
import { CurrentUserInterface } from './../../store/types/currentUser.interface';
import { linkAddClickAction } from './../../store/links/link.action';
import { LinkUpdateRequestInterface } from './../../store/types/linkUpdateRequest.interface';
import { linkUpdateActions } from '../../store/links/link.action';
import { LinkResponseInterface } from './../../store/types/linkResponse.interface';
import { switchMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable, pipe } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-link-details-page',
  templateUrl: './link-details-page.component.html',
  styleUrls: ['./link-details-page.component.scss'],
})
export class LinkDetailsPageComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  link: LinkResponseInterface;
  userIsLoading$: Observable<boolean>;
  linkIsLoading$: Observable<boolean>;
  form: FormGroup;
  isEdit: boolean = false;

  currentUser$: Observable<CurrentUserInterface>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.userIsLoading$ = this.store.pipe(select(userIsLoadingSelector));
    this.linkIsLoading$ = this.store.pipe(select(linksIsLoadingSelector));
    this.paramsSubscription = this.route.queryParams
      .pipe(
        switchMap((params: Params) => {
          const linkId = Number(params['id']);
          console.log(linkId);
          return this.store.pipe(
            select(linksSelector),
            map((links: LinkResponseInterface[]) => {
              return links.find((link) => link.id == linkId);
            })
          );
        })
      )
      .subscribe(
        (link) => {
          if (link) {
            this.link = link;
            this.initFrom();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) this.paramsSubscription.unsubscribe();
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
    const linkData: LinkUpdateRequestInterface = {
      linkId: this.link.id,
      description: this.form.value.description,
      tags: this.form.value.tags,
    };

    this.store.dispatch(linkUpdateActions({ request: linkData }));
    this.isEdit = !this.isEdit;
  }

  onClickLink() {
    this.store.dispatch(linkAddClickAction({ idClickLink: this.link.id }));
  }
}
