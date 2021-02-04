import { LinkUpdateRequestInterface } from './../types/linkUpdateRequest.interface';
import { TagResponseInterface } from './../types/tagResponse.interface';
import { BackendErrorsInterface } from './../types/backendError.interface';
import { LinkResponseInterface } from './../types/linkResponse.interface';
import { CreateLinkRequestInterface } from './../types/createLink.interface';
import { props, createAction } from '@ngrx/store';
import { LinkActionTypes } from './link.actionTypes';

export const createLinkAction = createAction(
  LinkActionTypes.CREATE_LINK,
  props<{ request: CreateLinkRequestInterface }>()
);

export const createLinkSuccessAction = createAction(
  LinkActionTypes.CREATE_LINK_SUCCESS,
  props<{ createdLink: LinkResponseInterface }>()
);

export const createLinkFailureAction = createAction(
  LinkActionTypes.CREATE_LINK_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);

export const deleteLinkAction = createAction(
  LinkActionTypes.DELETE_LINK,
  props<{ idDeleteLink: number }>()
);

export const deleteLinkSuccessAction = createAction(
  LinkActionTypes.DELETE_LINK_SUCCESS,
  props<{ idDeletedLink: number }>()
);

export const deleteLinkFailureAction = createAction(
  LinkActionTypes.DELETE_LINK_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);

export const getLinkByIdAction = createAction(
  LinkActionTypes.GET_LINK_BY_ID,
  props<{ requestLinkId: number }>()
);

export const getLinkByIdSuccessAction = createAction(
  LinkActionTypes.GET_LINK_BY_ID_SUCCESS,
  props<{ responseLink: LinkResponseInterface }>()
);

export const getLinkByIdFailureAction = createAction(
  LinkActionTypes.GET_LINK_BY_ID_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);

export const getTagAction = createAction(
  LinkActionTypes.GET_TAG,
  props<{ requestTag: string }>()
);

export const getTagSucccessAction = createAction(
  LinkActionTypes.GET_TAG_SUCCESS,
  props<{ currentTag: TagResponseInterface }>()
);

export const getTagFailureAction = createAction(
  LinkActionTypes.GET_TAG_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);

export const linkAddClickAction = createAction(
  LinkActionTypes.LINK_CLICKS_ADD,
  props<{ idClickLink: number }>()
);

export const linkUpdateActions = createAction(
  LinkActionTypes.UPDATE_LINK,
  props<{ request: LinkUpdateRequestInterface }>()
);

export const linkUpdateSuccessAction = createAction(
  LinkActionTypes.UPDATE_LINK_SUCCESS,
  props<{ updatedLink: LinkResponseInterface }>()
);

export const linkUpdateFailureAction = createAction(
  LinkActionTypes.UPDATE_LINK_FAILURE,
  props<{ error: BackendErrorsInterface }>()
);

export const setUserLinkAction = createAction(
  LinkActionTypes.SET_USER_LINK,
  props<{ userLink: LinkResponseInterface[] }>()
);
