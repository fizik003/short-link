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
