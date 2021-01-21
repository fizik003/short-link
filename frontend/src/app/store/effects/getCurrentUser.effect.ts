import { HttpErrorResponse } from '@angular/common/http';
import { CurrentUserInterface } from './../types/currentUser.interface';
import { switchMap, map, catchError } from 'rxjs/operators';
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
  constructor(private actions$: Actions, private authService: AuthService) {}

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
            console.log(errorResponse);
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );
}
