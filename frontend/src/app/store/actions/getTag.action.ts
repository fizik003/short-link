import { BackendErrorsInterface } from './../types/backendError.interface';
import { TagResponseInterface } from './../types/tagResponse.interface';
import { ActionTypes } from './../actionTypes';
import { createAction, props } from '@ngrx/store';

export const getTagAction = createAction(
  ActionTypes.GET_TAG,
  props<{ requestTag: string }>()
);

export const getTagSucccessAction = createAction(
  ActionTypes.GET_TAG_SUCCESS,
  props<{ currentTag: TagResponseInterface }>()
);

export const getTagFailureAction = createAction(
  ActionTypes.GET_TAG_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);
