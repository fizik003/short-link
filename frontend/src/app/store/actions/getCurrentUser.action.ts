import { CurrentUserInterface } from './../types/currentUser.interface';
import { ActionTypes } from './../actionTypes';
import { createAction, props } from '@ngrx/store';

export const getCurrnetUserAction = createAction(ActionTypes.GET_CURRENT_USER);

export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
);
