import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  getLinksByUserAction,
  getLinksByUserSuccessAction,
  getLinksByUserFailureAction,
} from './../link.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LinksService } from './../../../services/links.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetLinkByUserEffect {
  constructor(private linkService: LinksService, private actions$: Actions) {}

  getLinkByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLinksByUserAction),
      switchMap(({ page, count }) => {
        return this.linkService.getByUser(page, count).pipe(
          map((responseLinks) =>
            getLinksByUserSuccessAction({ links: responseLinks })
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getLinksByUserFailureAction({
                error: errorResponse.error.message,
              })
            );
          })
        );
      })
    );
  });
}
