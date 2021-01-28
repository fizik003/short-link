import { BackendErrorsInterface } from './../types/backendError.interface';
import { LinkResponseInterface } from './../types/linkResponse.interface';
import { ActionTypes } from './../actionTypes';
import { createAction, props } from '@ngrx/store';

export const getLinkByIdAction = createAction(
  ActionTypes.GET_LINK_BY_ID,
  props<{ requestLinkId: number }>()
);

export const getLinkByIdSuccessAction = createAction(
  ActionTypes.GET_LINK_BY_ID_SUCCESS,
  props<{ responseLink: LinkResponseInterface }>()
);

export const getLinkByIdFailureAction = createAction(
  ActionTypes.GET_LINK_BY_ID_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);
