import {
  yourLinksSelector,
  linksIsLoadingSelector,
} from './../../store/links/link.selector';
import { CurrentUserInterface } from './../../store/types/currentUser.interface';
import {
  currentUserSelector,
  isLoaddingSelector,
} from './../../store/selectors';
import { LinkResponseInterface } from './../../store/types/linkResponse.interface';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { MaterializeServices } from './../../shared/materialize/materialize.services';
import { Observable, Subscription } from 'rxjs';
import { LinksService } from './../../shared/services/links.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { deleteLinkAction } from 'src/app/store/actions/deleteLink.action';

@Component({
  selector: 'app-my-links-page',
  templateUrl: './my-links-page.component.html',
  styleUrls: ['./my-links-page.component.scss'],
})
export class MyLinksPageComponent implements OnInit, OnDestroy {
  linksSubscription: Subscription;
  isLoadingSubscription: Subscription;
  isLoading: boolean;
  currentUser: CurrentUserInterface;
  links: LinkResponseInterface[];
  constructor(private linkService: LinksService, private store: Store) {}

  ngOnInit(): void {
    this.linksSubscription = this.store
      .pipe(select(yourLinksSelector))
      .subscribe((links: LinkResponseInterface[]) => {
        if (links) {
          this.links = links;
        }
      });

    this.isLoadingSubscription = this.store
      .pipe(select(linksIsLoadingSelector))
      .subscribe((isLoadding: boolean) => {
        this.isLoading = isLoadding;
      });
  }

  ngOnDestroy(): void {}

  onDelete(id: number) {
    this.store.dispatch(deleteLinkAction({ idDeleteLink: id }));
  }
}
