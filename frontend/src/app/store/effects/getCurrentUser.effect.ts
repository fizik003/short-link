import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrentUserInterface } from './../types/currentUser.interface';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import {
  getCurrnetUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './../actions/getCurrentUser.action';
import { AuthService } from './../../shared/services/auth.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrnetUserAction),
      switchMap(() => {
        const token = this.authService.getToken();
        if (!token) {
          return of(getCurrentUserFailureAction());
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.router.navigate(['login']);
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );

  // redirectAfterGetUser$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(getCurrentUserSuccessAction),
  //       tap(() => {
  //         console.log('in effect');

  //         this.router.navigate(['main']);
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );
}
