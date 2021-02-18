import { BackendErrorsInterface } from './../types/backendError.interface';
import { StatisticsResponseInterface } from './../types/statisticsRsponse.interface';
import { StatActionTypes } from './stat.actionTypes';
import { createAction, props } from '@ngrx/store';

export const getStatisticAction = createAction(StatActionTypes.GET_STATISTICS);

export const getStatisticSuccessAction = createAction(
  StatActionTypes.GET_STATISTICS_SUCCESS,
  props<{ statisticCurrentUser: StatisticsResponseInterface }>()
);

export const getStatisticFailureAction = createAction(
  StatActionTypes.GET_STATISTICS_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);
