import { LinkStateInterface } from './types/linkState.interface';
import { AppAllStateInterface } from './../types/appAllState.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const linkFeatureSelector = createFeatureSelector<
  AppAllStateInterface,
  LinkStateInterface
>('link');

export const yourLinksSelector = createSelector(
  linkFeatureSelector,
  (linkState) => linkState.yourLinks
);

export const linksIsLoadingSelector = createSelector(
  linkFeatureSelector,
  (linkState) => linkState.isLoading
);

export const linksSelector = createSelector(
  linkFeatureSelector,
  (linkState) => [...linkState.othersUsersLink, ...linkState.yourLinks]
);

export const tagSelector = createSelector(
  linkFeatureSelector,
  (linkState) => linkState.tags
);
