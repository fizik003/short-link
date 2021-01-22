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

export const isLoaddingSelector = createSelector(
  appFeatureSelector,
  (appState) => appState.isLoading
);
