import { createReducer, on, Action } from '@ngrx/store';
import { UserStateInterface } from './types/userState.interface';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction,
} from './user.action';

const initialState: UserStateInterface = {
  currentUser: null,
  isLoadding: false,
  isLoggedIn: undefined,
  errors: null,
};

const userReducer = createReducer(
  initialState,
  on(getCurrentUserAction, (state) => {
    return {
      ...state,
      isLoadding: true,
    };
  }),
  on(getCurrentUserSuccessAction, (state, action) => {
    return {
      ...state,
      isLoadding: false,
      currentUser: action.currentUser,
      isLoggedIn: true,
    };
  }),
  on(getCurrentUserFailureAction, (state) => {
    return {
      ...state,
      isLoadding: false,
      isLoggedIn: false,
      currentUser: null,
    };
  }),
  on(loginAction, (state) => {
    return {
      ...state,
      errors: null,
      isLoadding: true,
    };
  }),
  on(loginSuccessAction, (state, action) => {
    return {
      ...state,
      isLoggedIn: true,
      currentUser: action.currentUser,
      isLoadding: false,
    };
  }),
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
  })
);

export function reducer(state: UserStateInterface, action: Action) {
  return userReducer(state, action);
}
