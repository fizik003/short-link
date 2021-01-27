import { BackendErrorsInterface } from './../types/backendError.interface';
import { StatisticsResponseInterface } from './../types/statisticsRsponse.interface';
import { ActionTypes } from './../actionTypes';
import { createAction, props } from '@ngrx/store';

export const getStatisticsAction = createAction(ActionTypes.GET_STATISTICS);

export const getStatisticsSuccessAction = createAction(
  ActionTypes.GET_STATISTICS_SUCCESS,
  props<{ statisticsCurrenUser: StatisticsResponseInterface }>()
);

export const getStatisticsFailureAction = createAction(
  ActionTypes.GET_STATISTICS_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);
