import { UserStateInterface } from './types/userState.interface';
import { AppAllStateInterface } from './../types/appAllState.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const userFeatureSelector = createFeatureSelector<
  AppAllStateInterface,
  UserStateInterface
>('user');

export const isLoggedInSelector = createSelector(
  userFeatureSelector,
  (userState) => userState.isLoggedIn
);

export const currentUserSelector = createSelector(
  userFeatureSelector,
  (userState) => userState.currentUser
);

export const userIsLoadingSelector = createSelector(
  userFeatureSelector,
  (userState) => userState.isLoadding
);
