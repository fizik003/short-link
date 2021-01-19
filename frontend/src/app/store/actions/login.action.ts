import { BackendErrorsInterface } from './../types/backendError.interface';
import { CurrentUserInterface } from './../types/currentUser.interface';
import { LoginRequestInterface } from './../types/loginRequest.interface';
import { ActionTypes } from './../actionTypes';
import { createAction, props } from '@ngrx/store';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);
