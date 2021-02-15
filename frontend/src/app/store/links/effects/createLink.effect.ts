import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { LinksService } from '../../../shared/services/links.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  createLinkAction,
  createLinkSuccessAction,
  createLinkFailureAction,
} from '../link.action';
import { of } from 'rxjs';
import { getStatisticAction } from '../../stat/stat.actions';

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
            this.store.dispatch(getStatisticAction());
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
}
