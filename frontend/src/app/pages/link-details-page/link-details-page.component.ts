import { CurrentUserInterface } from './../../store/types/currentUser.interface';
import { getLinkByIdAction } from './../../store/actions/getLinkById.action';
import { linkAddClickAction } from './../../store/actions/linkAddClick.action';
import { LinkUpdateRequestInterface } from './../../store/types/linkUpdateRequest.interface';
import { linkUpdateActions } from '../../store/actions/linkUpdate.action';
import { LinkResponseInterface } from './../../store/types/linkResponse.interface';
import {
  currentUserSelector,
  isLoaddingSelector,
  linksOtherUsersSelector,
  idCurrentUserSelector,
} from './../../store/selectors';
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
  isLoading$: Observable<boolean>;
  form: FormGroup;
  isEdit: boolean = false;

  currentUser$: Observable<CurrentUserInterface>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.isLoading$ = this.store.pipe(select(isLoaddingSelector));
    this.paramsSubscription = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.store.pipe(select(currentUserSelector)).pipe(
            switchMap((currentUser) => {
              return this.store.pipe(
                select(linksOtherUsersSelector),
                map((linksOtherUser) => {
                  let links: LinkResponseInterface[] = [];
                  if (currentUser) {
                    links = [...currentUser.links, ...linksOtherUser];
                  } else links = linksOtherUser;

                  const currentLink = links.find(
                    (link) => link.id == params['id']
                  );
                  if (currentLink) {
                    return currentLink;
                  }

                  return this.store.dispatch(
                    getLinkByIdAction({ requestLinkId: params['id'] })
                  );
                })
              );
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
