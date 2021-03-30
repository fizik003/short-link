import { StatStateInterface } from './types/statState.interface';
import { AppAllStateInterface } from './../types/appAllState.interface';
import { AppStateInterface } from './../types/appState.interface';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const statFeatureSelector = createFeatureSelector<
  AppAllStateInterface,
  StatStateInterface
>('stat');

export const statSelector = createSelector(
  statFeatureSelector,
  (statState) => ({
    countLink: statState.countLink,
    countAllRedirect: statState.countAllRedirect,
  })
);

export const countLinksSelector = createSelector(
  statFeatureSelector,
  (statState) => statState.countLink
);

export const statIsLoading = createSelector(
  statFeatureSelector,
  (statState) => statState.isLoading
);
