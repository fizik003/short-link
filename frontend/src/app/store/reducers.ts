import {
  getTagAction,
  getTagSucccessAction,
  getTagFailureAction,
} from './actions/getTag.action';
import {
  getStatisticsAction,
  getStatisticsSuccessAction,
  getStatisticsFailureAction,
} from './actions/getStatistics.action';
import {
  createLinkAction,
  createLinkFailureAction,
  createLinkSuccessAction,
} from './actions/createLink.action';
import { linkAddClickAction } from './actions/linkAddClick.action';
import {
  linkUpdateActions,
  linkUpdateSuccessAction,
  linkUpdateFailureAction,
} from './actions/linkUpdate.action';
import {
  getCurrnetUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction,
} from './actions/getCurrentUser.action';
import { logoutAction } from './actions/logout.action';
import {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
} from './actions/login.action';
import { createReducer, on, Action, createAction } from '@ngrx/store';
import { AppStateInterface } from './types/appState.interface';
import {
  deleteLinkAction,
  deleteLinkFailureAction,
  deleteLinkSuccessAction,
} from './actions/deleteLink.action';

const initialState: AppStateInterface = {
  currentUser: null,
  isLoading: false,
  isLoggedIn: false,
  isSubmitting: false,
  errors: null,
  statistics: null,
  linksOtherUsers: [],
  tags: [],
};

const appReducer = createReducer(
  initialState,
  on(
    loginAction,
    (state): AppStateInterface => {
      return {
        ...state,
        errors: null,
        isSubmitting: true,
      };
    }
  ),
  on(
    loginSuccessAction,
    (state, action): AppStateInterface => {
      return {
        ...state,
        isSubmitting: false,
        isLoggedIn: true,
        currentUser: action.currentUser,
      };
    }
  ),
  on(loginFailureAction, (state, action) => {
    return {
      ...state,
      errors: action.error,
    };
  }),
  on(logoutAction, (state) => {
    return {
      ...initialState,
    };
  }),
  on(getCurrnetUserAction, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getCurrentUserSuccessAction, (state, action) => {
    return {
      ...state,
      currentUser: action.currentUser,
      isLoggedIn: true,
      isLoading: false,
    };
  }),
  on(getCurrentUserFailureAction, (state) => {
    return {
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    };
  }),
  on(linkUpdateActions, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(linkUpdateSuccessAction, (state, action) => {
    const { updatedLink } = action;
    const indexUpdatedLink = state.currentUser.links.findIndex(
      (el) => el.id === updatedLink.id
    );
    const newLinksArr = [
      ...state.currentUser.links.slice(0, indexUpdatedLink),
      updatedLink,
      ...state.currentUser.links.slice(indexUpdatedLink + 1),
    ];

    return {
      ...state,
      isLoading: false,
      currentUser: {
        ...state.currentUser,
        links: newLinksArr,
      },
    };
  }),
  on(linkUpdateFailureAction, (state, action) => {
    return {
      ...state,
      errors: action.error,
      isLoading: false,
    };
  }),
  on(linkAddClickAction, (state, action) => {
    const { idClickLink } = action;
    const currenLink = {
      ...state.currentUser.links.find((el) => el.id == idClickLink),
    };

    const indexClickLink = state.currentUser.links.findIndex(
      (el) => el.id == idClickLink
    );
    currenLink.clicks = currenLink.clicks + 1;
    return {
      ...state,
      currentUser: {
        ...state.currentUser.links,
        links: [
          ...state.currentUser.links.slice(0, indexClickLink),
          currenLink,
          ...state.currentUser.links.slice(indexClickLink + 1),
        ],
      },
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
      currentUser: {
        ...state.currentUser,
        links: [...state.currentUser.links, createdLink],
      },
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
    const arrLinks = [...state.currentUser.links];
    const indexDeletedLink = arrLinks.findIndex(
      (link) => link.id == idDeletedLink
    );
    arrLinks.splice(indexDeletedLink, 1);
    return {
      ...state,
      isLoading: false,
      currentUser: {
        ...state.currentUser,
        links: arrLinks,
      },
    };
  }),

  on(deleteLinkFailureAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      errors: action.error,
    };
  }),
  on(getStatisticsAction, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getStatisticsSuccessAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      statistics: action.statisticsCurrenUser,
    };
  }),
  on(getStatisticsFailureAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      statistics: null,
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
      linksByTag: [],
      errors: action.error,
    };
  })
);

export function reducer(state: AppStateInterface, action: Action) {
  return appReducer(state, action);
}
