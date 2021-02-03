import { CurrentUserInterface } from './../types/currentUser.interface';
import { UserActionTypes } from './user.actionTypes';
import { createAction, props } from '@ngrx/store';

export const getCurrentUserAction = createAction(
  UserActionTypes.GET_CURRENT_USER
);

export const getCurrentUserSuccessAction = createAction(
  UserActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const getCurrentUserFailureAction = createAction(
  UserActionTypes.GET_CURRENT_USER_FAILURE
);
