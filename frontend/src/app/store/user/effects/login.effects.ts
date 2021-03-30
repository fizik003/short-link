// import { setUserLinkAction } from '../../links/link.action';
import { Store } from "@ngrx/store";
import { CurrentUserInterface } from "../../types/currentUser.interface";
// import {
//   loginAction,
//   loginSuccessAction,
//   loginFailureAction,
// } from './../actions/login.action';
import { loginAction, loginFailureAction, loginSuccessAction } from "../user.action";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            const { email, id, token, links } = currentUser;
            const responseCurentUser = { email, id, token };
            return loginSuccessAction({ currentUser: responseCurentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailureAction({ error: errorResponse.error.message }));
          }),
        );
      }),
    ),
  );

  redirectAfterSubmit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigate(["/main"]);
        }),
      );
    },

    { dispatch: false },
  );
}
