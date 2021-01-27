import { getStatisticsAction } from './../../store/actions/getStatistics.action';
import { linkAddClickAction } from './../../store/actions/linkAddClick.action';
import { LinkUpdateRequestInterface } from './../../store/types/linkUpdateRequest.interface';
import { linkUpdateActions } from '../../store/actions/linkUpdate.action';
import { LinkResponseInterface } from './../../store/types/linkResponse.interface';
import {
  currentUserSelector,
  isLoaddingSelector,
} from './../../store/selectors';
import { switchMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
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
  isLoading$: Observable<boolean>;
  isEmpty = false;
  form: FormGroup;
  isEdit = false;
  isCanEdit = false;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(isLoaddingSelector));
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
            this.initFrom();
          }
        },
        (err) => console.log(err.message)
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
