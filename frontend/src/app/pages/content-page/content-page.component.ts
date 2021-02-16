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
  whatOpen: string;
  routeParam$: Observable<Params>;
  queryParams: Params;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.queryParams = queryParams;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
  }
}
