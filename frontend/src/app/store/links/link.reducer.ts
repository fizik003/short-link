import { createReducer, on, Action } from '@ngrx/store';
import { LinkStateInterface } from './types/linkState.interface';
import {
  createLinkAction,
  createLinkFailureAction,
  createLinkSuccessAction,
  deleteLinkAction,
  deleteLinkFailureAction,
  deleteLinkSuccessAction,
  getLinkByIdAction,
  getLinkByIdFailureAction,
  getLinkByIdSuccessAction,
  getTagAction,
  getTagFailureAction,
  getTagSucccessAction,
  linkAddClickAction,
  linkUpdateActions,
  linkUpdateFailureAction,
  linkUpdateSuccessAction,
  setUserLinkAction,
} from './link.action';

const initialState: LinkStateInterface = {
  isLoading: false,
  othersUsersLink: [],
  tags: [],
  yourLinks: [],
  errors: null,
};

const reducer = createReducer(
  initialState,
  on(linkUpdateActions, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(linkUpdateSuccessAction, (state, action) => {
    const { updatedLink } = action;
    const newArrLinks = [...state.yourLinks];
    const indexUpdatedLink = newArrLinks.findIndex(
      (link) => link.id === updatedLink.id
    );
    newArrLinks.splice(indexUpdatedLink, 1, updatedLink);
    return {
      ...state,
      yourLinks: newArrLinks,
      isLoading: false,
    };
  }),
  on(linkUpdateFailureAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      errors: action.error,
    };
  }),

  on(linkAddClickAction, (state, action) => {
    const { idClickLink } = action;
    const currenLink = {
      ...state.yourLinks.find((el) => el.id == idClickLink),
    };

    const indexClickLink = state.yourLinks.findIndex(
      (el) => el.id == idClickLink
    );
    currenLink.clicks = currenLink.clicks + 1;
    return {
      ...state,
      yourLinks: state.yourLinks.splice(indexClickLink, 1, currenLink),
    };
  }),

  on(createLinkAction, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(createLinkSuccessAction, (state, action) => {
    const { createdLink } = action;
    return {
      ...state,
      isLoading: false,
      yourLinks: [...state.yourLinks, createdLink],
    };
  }),

  on(createLinkFailureAction, (state, action) => {
    return {
      ...state,
      errors: action.error,
      isLoading: false,
    };
  }),
  on(deleteLinkAction, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(deleteLinkSuccessAction, (state, action) => {
    const { idDeletedLink } = action;
    const arrLinks = [...state.yourLinks];
    const indexDeletedLink = arrLinks.findIndex(
      (link) => link.id == idDeletedLink
    );
    arrLinks.splice(indexDeletedLink, 1);
    return {
      ...state,
      isLoading: false,
      yourLinks: arrLinks,
    };
  }),

  on(deleteLinkFailureAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      errors: action.error,
    };
  }),

  on(getTagAction, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(getTagSucccessAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      tags: [...state.tags, action.currentTag],
    };
  }),

  on(getTagFailureAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      errors: action.error,
    };
  }),

  on(getLinkByIdAction, (state) => {
    return {
      ...state,
      isLoading: true,
      errors: null,
    };
  }),

  on(getLinkByIdSuccessAction, (state, action) => {
    const link = action.responseLink;
    return {
      ...state,
      isLoading: false,
      othersUsersLink: [...state.othersUsersLink, link],
    };
  }),
  on(getLinkByIdFailureAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      errors: action.error,
    };
  }),

  on(setUserLinkAction, (state, action) => {
    return {
      ...state,
      yourLinks: action.userLink,
    };
  })
);

export function LinkReducer(state: LinkStateInterface, action: Action) {
  return reducer(state, action);
}
