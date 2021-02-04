import { ActionTypes } from './../actionTypes';
import { createAction, props } from '@ngrx/store';

export const linkAddClickAction = createAction(
  ActionTypes.LINK_CLICKS_ADD,
  props<{ idClickLink: number }>()
);
