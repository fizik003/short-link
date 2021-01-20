import { ActionTypes } from './../actionTypes';
import { createAction } from '@ngrx/store';

export const logoutAction = createAction(ActionTypes.LOGOUT);
