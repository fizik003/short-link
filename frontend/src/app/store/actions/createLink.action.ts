import { BackendErrorsInterface } from './../types/backendError.interface';
import { LinkResponseInterface } from './../types/linkResponse.interface';
import { CreateLinkRequestInterface } from './../types/createLink.interface';
import { ActionTypes } from './../actionTypes';
import { createAction, props } from '@ngrx/store';

export const createLinkAction = createAction(
  ActionTypes.CREATE_LINK,
  props<{ request: CreateLinkRequestInterface }>()
);

export const createLinkSuccessAction = createAction(
  ActionTypes.CREATE_LINK_SUCCESS,
  props<{ createdLink: LinkResponseInterface }>()
);

export const createLinkFailureAction = createAction(
  ActionTypes.CREATE_LINK_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);
