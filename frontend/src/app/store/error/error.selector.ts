import { userErrorSelector } from '../user/user.selector';
import { linksErrorSelector } from '../links/link.selector';
import { createSelector } from '@ngrx/store';

export const errorSelector = createSelector(
  linksErrorSelector,
  userErrorSelector,
  (linksError, userError) => [linksError, userError]
);
