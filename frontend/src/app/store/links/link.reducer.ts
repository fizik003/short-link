import { createReducer, on, Action } from "@ngrx/store";
import { LinkStateInterface } from "./types/linkState.interface";
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
  getLinksByUserAction,
  getLinksByUserSuccessAction,
  getLinksByUserFailureAction,
  getTagAction,
  getTagFailureAction,
  getTagSucccessAction,
  linkAddClickAction,
  linkUpdateActions,
  linkUpdateFailureAction,
  linkUpdateSuccessAction,
  // setUserLinkAction,
} from "./link.action";

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
    const indexUpdatedLink = newArrLinks.findIndex((link) => link.id === updatedLink.id);
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
    const idLink = action.idClickLink;
    let arrYourLinks = [...state.yourLinks];
    let arrOtherUserLinks = [...state.othersUsersLink];
    let currentLink = arrYourLinks.find((link) => link.id == idLink);
    if (currentLink) {
      currentLink = { ...currentLink };
      currentLink.clicks += 1;
      let indexCurrentLink = arrYourLinks.findIndex((link) => link.id === idLink);
      arrYourLinks.splice(indexCurrentLink, 1, currentLink);

      return {
        ...state,
        yourLinks: arrYourLinks,
      };
    }

    currentLink = arrOtherUserLinks.find((link) => link.id == idLink);
    currentLink = { ...currentLink };
    currentLink.clicks += 1;
    let indexCurrentLink = arrOtherUserLinks.findIndex((link) => link.id === idLink);
    arrOtherUserLinks.splice(indexCurrentLink, 1, currentLink);

    return {
      ...state,
      othersUsersLink: arrOtherUserLinks,
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
      yourLinks: [createdLink, ...state.yourLinks],
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
    const indexDeletedLink = arrLinks.findIndex((link) => link.id == idDeletedLink);
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
  on(getLinksByUserAction, (state, action) => {
    return {
      ...state,
      isLoading: true,
      errors: null,
    };
  }),
  on(getLinksByUserSuccessAction, (state, action) => {
    if (action.links.length > 0) {
      return {
        ...state,
        yourLinks: [...state.yourLinks, ...action.links],
        isLoading: false,
      };
    }
    return {
      ...state,
      yourLinks: [...state.yourLinks, ...action.links],
      isLoading: false,
    };
  }),
  on(getLinksByUserFailureAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      errors: action.error,
    };
  }),

  // on(setUserLinkAction, (state, action) => {
  //   return {
  //     ...state,
  //     yourLinks: action.userLink,
  //   };
  // })
);

export function LinkReducer(state: LinkStateInterface, action: Action) {
  return reducer(state, action);
}
