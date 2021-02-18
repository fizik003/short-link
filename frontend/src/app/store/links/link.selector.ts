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

export const otherUserLinks = createSelector(
  linkFeatureSelector,
  (linkState) => linkState.othersUsersLink
);

export const linksSelector = createSelector(
  yourLinksSelector,
  otherUserLinks,
  (yourLinks, otherUserLinks) => [...yourLinks, ...otherUserLinks]
);

export const tagSelector = createSelector(
  linkFeatureSelector,
  (linkState) => linkState.tags
);

export const linksErrorSelector = createSelector(
  linkFeatureSelector,
  (linkState) => linkState.errors
);
