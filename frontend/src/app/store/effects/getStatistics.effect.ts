import { HttpErrorResponse } from '@angular/common/http';
import {
  getStatisticsSuccessAction,
  getStatisticsFailureAction,
  getStatisticsAction,
} from './../actions/getStatistics.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { LinksService } from './../../shared/services/links.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetStatisticsEffect {
  constructor(private actions$: Actions, private linksService: LinksService) {}

  getStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStatisticsAction),
      switchMap(() => {
        return this.linksService.getStats().pipe(
          map(
            (statistics) => {
              return getStatisticsSuccessAction({
                statisticsCurrenUser: statistics,
              });
            },
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                getStatisticsFailureAction({
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
