import { getStatisticsAction } from './../actions/getStatistics.action';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  createLinkSuccessAction,
  createLinkFailureAction,
} from './../actions/createLink.action';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { LinksService } from './../../shared/services/links.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createLinkAction } from '../actions/createLink.action';
import { of } from 'rxjs';

@Injectable()
export class CreateLinkEffect {
  constructor(
    private actions$: Actions,
    private linkService: LinksService,
    private router: Router,
    private store: Store
  ) {}

  createLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createLinkAction),
      switchMap(({ request }) => {
        return this.linkService.create(request).pipe(
          map((createdLink) => {
            return createLinkSuccessAction({ createdLink });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createLinkFailureAction({ error: errorResponse.error.message })
            );
          })
        );
      })
    );
  });

  redirectAfterCreateLink = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createLinkSuccessAction),
        tap(({ createdLink }) => {
          this.router.navigate(['link', 'details', createdLink.id]);
        })
      );
    },
    { dispatch: false }
  );

  updateStatisticAfterCreate = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createLinkSuccessAction),
        tap(() => this.store.dispatch(getStatisticsAction()))
      );
    },
    { dispatch: false }
  );
}
