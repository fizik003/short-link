import { BackendErrorsInterface } from './../types/backendError.interface';
import { LoginRequestInterface } from './../types/loginRequest.interface';
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

export const logoutAction = createAction(UserActionTypes.LOGOUT);

export const loginAction = createAction(
  UserActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
  UserActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const loginFailureAction = createAction(
  UserActionTypes.LOGIN_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);
