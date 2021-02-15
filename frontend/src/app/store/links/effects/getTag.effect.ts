import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  getTagAction,
  getTagSucccessAction,
  getTagFailureAction,
} from '../link.action';
import { TagsService } from '../../../shared/services/tags.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetTagEffect {
  constructor(
    private actions$: Actions,
    private tagsService: TagsService,
    private store: Store
  ) {}

  getTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTagAction),
      switchMap(({ requestTag }) => {
        return this.tagsService.getTag(requestTag).pipe(
          map((currentTag) => {
            return getTagSucccessAction({ currentTag });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getTagFailureAction({ error: errorResponse.error.message })
            );
          })
        );
      })
    );
  });
}
