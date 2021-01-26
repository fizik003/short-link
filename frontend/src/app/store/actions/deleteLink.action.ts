import { BackendErrorsInterface } from './../types/backendError.interface';
import { ActionTypes } from './../actionTypes';
import { createAction, props } from '@ngrx/store';

export const deleteLinkAction = createAction(
  ActionTypes.DELETE_LINK,
  props<{ idDeleteLink: string }>()
);

export const deleteLinkSuccessAction = createAction(
  ActionTypes.DELETE_LINK_SUCCESS,
  props<{ idDeletedLink: string }>()
);

export const deleteLinkFailureAction = createAction(
  ActionTypes.DELETE_LINK_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);
