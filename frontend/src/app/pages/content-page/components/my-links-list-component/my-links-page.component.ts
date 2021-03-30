import { switchMap, map } from "rxjs/operators";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { countLinksSelector } from "./../../../../store/stat/stat.selector";
import { getLinksByUserAction } from "./../../../../store/links/link.action";
import { yourLinksSelector, linksIsLoadingSelector } from "../../../../store/links/link.selector";
import { CurrentUserInterface } from "../../../../store/types/currentUser.interface";
import { LinkResponseInterface } from "../../../../store/types/linkResponse.interface";
import { Store, select } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { LinksService } from "../../../../services/links.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { deleteLinkAction } from "src/app/store/links/link.action";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-my-links-page",
  templateUrl: "./my-links-page.component.html",
  styleUrls: ["./my-links-page.component.scss"],
})
export class MyLinksPageComponent implements OnInit, OnDestroy {
  linksSubscription: Subscription;
  isLoadingSubscription: Subscription;
  isLoading: boolean;
  currentUser: CurrentUserInterface;
  allLinks: LinkResponseInterface[];
  showLinks: LinkResponseInterface[];
  countOfLinks$: Observable<number>;
  countLinkOnPage: number;
  pageNumber: number;
  qParamsSubscription: Subscription;

  constructor(
    private linkService: LinksService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.linksSubscription = this.store
    //   .pipe(select(yourLinksSelector))
    //   .subscribe((links: LinkResponseInterface[]) => {
    //     if (links) {
    //       this.allLinks = links;
    //       this.allLinks.slice().sort((a, b) => Number(a.id) - Number(b.id));
    //     }
    //   });

    this.qParamsSubscription = this.route.queryParams
      .pipe(
        switchMap((qParams: Params) => {
          return this.store.pipe(select(yourLinksSelector)).pipe(
            map((links: LinkResponseInterface[]) => {
              if (links) {
                this.allLinks = links;
                this.allLinks.slice().sort((a, b) => Number(a.id) - Number(b.id));
                this.pageNumber = qParams["page"];
                this.countLinkOnPage = qParams["count"];
                console.log(111111);
                const fromNumberLink = (this.pageNumber - 1) * this.countLinkOnPage;
                if (this.allLinks.length < fromNumberLink + 1) {
                  return this.store.dispatch(
                    getLinksByUserAction({ count: this.countLinkOnPage, page: this.pageNumber }),
                  );
                }
                const fromLink = (this.pageNumber - 1) * this.countLinkOnPage;
                console.log(fromLink, fromLink + this.countLinkOnPage + 1);
                return this.allLinks.slice(fromLink, fromLink + Number(this.countLinkOnPage));
              }
            }),
          );
        }),
      )
      .subscribe((links: LinkResponseInterface[]) => {
        console.log(333333333);
        this.showLinks = links;
      });

    this.isLoadingSubscription = this.store
      .pipe(select(linksIsLoadingSelector))
      .subscribe((isLoadding: boolean) => {
        this.isLoading = isLoadding;
      });

    this.countOfLinks$ = this.store.pipe(select(countLinksSelector));
  }

  fff(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.countLinkOnPage = event.pageSize;
    this.router.navigate(["/content"], {
      queryParams: {
        myLinks: true,
        page: event.pageIndex + 1,
        count: event.pageSize,
      },
    });
  }

  ngOnDestroy(): void {
    if (this.linksSubscription) this.linksSubscription.unsubscribe();

    if (this.isLoadingSubscription) this.isLoadingSubscription.unsubscribe();
    if (this.qParamsSubscription) this.qParamsSubscription.unsubscribe();
  }

  onDelete(id: number) {
    this.store.dispatch(deleteLinkAction({ idDeleteLink: id }));
  }
}
