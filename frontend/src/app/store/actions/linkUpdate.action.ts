import { BackendErrorsInterface } from './../types/backendError.interface';
import { LinkResponseInterface } from '../types/linkResponse.interface';
import { LinkUpdateRequestInterface } from '../types/linkUpdateRequest.interface';
import { ActionTypes } from '../actionTypes';
import { createAction, props } from '@ngrx/store';

export const linkUpdateActions = createAction(
  ActionTypes.UPDATE_LINK,
  props<{ request: LinkUpdateRequestInterface }>()
);

export const linkUpdateSuccessAction = createAction(
  ActionTypes.UPDATE_LINK_SUCCESS,
  props<{ updatedLink: LinkResponseInterface }>()
);

export const linkUpdateFailureAction = createAction(
  ActionTypes.UPDATE_LINK_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);
