import { isLoggedInSelector } from './../../store/selectors';
import { Store, select } from '@ngrx/store';
import { AuthService } from './../services/auth.service';
import { Injectable, OnInit } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  isCanGo: boolean;
  subscribeOnIsLogged: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // this.store
    //   .pipe(select(isLoggedInSelector))
    //   .subscribe((isLoggedIn) => {
    //     this.isCanGo = isLoggedIn;
    //   })
    //   .unsubscribe();
    this.isCanGo = !!this.auth.getToken();

    if (this.isCanGo) {
      return of(true);
    } else {
      this.router.navigate(['/login'], {
        queryParams: { accessDenided: true },
      });
      return of(false);
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
