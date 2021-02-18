import { HttpErrorResponse } from '@angular/common/http';

import {
  getStatisticAction,
  getStatisticFailureAction,
  getStatisticSuccessAction,
} from '../stat.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { LinksService } from '../../../services/links.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetStatisticsEffect {
  constructor(private actions$: Actions, private linksService: LinksService) {}

  getStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStatisticAction),
      switchMap(() => {
        return this.linksService.getStats().pipe(
          map(
            (statistics) => {
              return getStatisticSuccessAction({
                statisticCurrentUser: statistics,
              });
            },
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                getStatisticFailureAction({
                  error: errorResponse.error.message,
                })
              );
            })
          )
        );
      })
    )
  );
}
