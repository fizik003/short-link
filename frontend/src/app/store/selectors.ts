import { AppAllStateInterface } from './types/appAllState.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from './types/appState.interface';

export const appFeatureSelector = createFeatureSelector<
  AppAllStateInterface,
  AppStateInterface
>('app');

export const isSubmittingSelector = createSelector(
  appFeatureSelector,
  (appState) => appState.isSubmitting
);

export const isLoggedInSelector = createSelector(
  appFeatureSelector,
  (appState) => appState.isLoggedIn
);

export const currentUserSelector = createSelector(
  appFeatureSelector,
  (appState) => appState.currentUser
);

export const idCurrentUserSelector = createSelector(
  appFeatureSelector,
  (appState) => Number(appState.currentUser.id)
);

export const isLoaddingSelector = createSelector(
  appFeatureSelector,
  (appState) => appState.isLoading
);

export const statisticsSelector = createSelector(
  appFeatureSelector,
  (appState) => appState.statistics
);

export const tagSelector = createSelector(
  appFeatureSelector,
  (appState) => appState.tags
);

export const linksOtherUsersSelector = createSelector(
  appFeatureSelector,
  (appState) => appState.linksOtherUsers
);
