import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LinksService } from '../../../shared/services/links.service';
import { Injectable } from '@angular/core';
import {
  deleteLinkAction,
  deleteLinkFailureAction,
  deleteLinkSuccessAction,
} from '../link.action';
import { of } from 'rxjs';

@Injectable()
export class DeleteLinkEffect {
  constructor(private actions$: Actions, private linkService: LinksService) {}

  deleteLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteLinkAction),
      switchMap(({ idDeleteLink }) => {
        return this.linkService.delete(idDeleteLink).pipe(
          map(() => deleteLinkSuccessAction({ idDeletedLink: idDeleteLink })),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteLinkFailureAction({ error: errorResponse.error.message })
            );
          })
        );
      })
    );
  });
}
