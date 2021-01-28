import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  getLinkByIdAction,
  getLinkByIdSuccessAction,
  getLinkByIdFailureAction,
} from './../actions/getLinkById.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LinksService } from './../../shared/services/links.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetLinkByIdEffect {
  constructor(
    private linksService: LinksService,
    private store: Store,
    private actions$: Actions
  ) {}

  getLinkById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLinkByIdAction),
      switchMap(({ requestLinkId }) => {
        return this.linksService.getByLinkId(requestLinkId).pipe(
          map((responseLink) => getLinkByIdSuccessAction({ responseLink })),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getLinkByIdFailureAction({ error: errorResponse.error.message })
            );
          })
        );
      })
    );
  });
}
