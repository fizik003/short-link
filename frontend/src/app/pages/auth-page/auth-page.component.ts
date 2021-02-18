import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  routeQParams$: Observable<Params>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeQParams$ = this.route.queryParams;
  }
}
