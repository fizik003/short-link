import { linksIsLoadingSelector } from './../../store/links/link.selector';
import { userIsLoadingSelector } from './../../store/user/user.selector';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
})
export class ContentPageComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  routeParam$: Observable<Params>;
  queryParams: Params;
  userIsloading$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.userIsloading$ = this.store.pipe(select(userIsLoadingSelector));
    this.routeSubscription = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.queryParams = queryParams;
        console.log(queryParams);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
  }
}
