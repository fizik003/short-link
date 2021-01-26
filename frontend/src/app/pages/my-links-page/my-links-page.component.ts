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
  lSub: Subscription;
  lSubDele: Subscription;
  curentUserSubscription: Subscription;
  isLoadingSubscription: Subscription;
  isLoading: boolean;
  currentUser: CurrentUserInterface;
  links: LinkResponseInterface[];
  constructor(private linkService: LinksService, private store: Store) {}

  ngOnInit(): void {
    this.curentUserSubscription = this.store
      .pipe(select(currentUserSelector))
      .subscribe((currentUserResponse: CurrentUserInterface) => {
        if (currentUserResponse) {
          this.currentUser = currentUserResponse;
          this.links = currentUserResponse.links;
        }
      });

    this.isLoadingSubscription = this.store
      .pipe(select(isLoaddingSelector))
      .subscribe((isLoadding: boolean) => {
        this.isLoading = isLoadding;
      });
  }

  ngOnDestroy(): void {
    if (this.lSub) this.lSub.unsubscribe();
    if (this.lSubDele) this.lSubDele.unsubscribe();
  }

  onDelete(id: number) {
    // this.lSubDele = this.linkService.delete(id).subscribe(
    //   (data) => {
    //     MaterializeServices.tooast('Ссылка удалена');
    //     const delId = this.links.findIndex((item) => {
    //       return item.id === id;
    //     });
    //     this.links.splice(delId, 1);
    //   },
    //   (error) => {
    //     MaterializeServices.tooast(error.error.message);
    //   }
    // );

    this.store.dispatch(deleteLinkAction({ idDeleteLink: id }));
  }
}
