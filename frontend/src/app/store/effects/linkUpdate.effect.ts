import { HttpErrorResponse } from '@angular/common/http';
import { LinkResponseInterface } from './../types/linkResponse.interface';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  linkUpdateActions,
  linkUpdateSuccessAction,
  linkUpdateFailureAction,
} from '../actions/linkUpdate.action';
import { LinksService } from './../../shared/services/links.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class LinkUpdateEffect {
  constructor(private actions$: Actions, private linkService: LinksService) {}

  linkUpdate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(linkUpdateActions),
      switchMap(({ request }) => {
        return this.linkService.update(request).pipe(
          map((updatedLink: LinkResponseInterface) => {
            return linkUpdateSuccessAction({ updatedLink });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              linkUpdateFailureAction({ error: errorResponse.error.message })
            );
          })
        );
      })
    );
  });
}
