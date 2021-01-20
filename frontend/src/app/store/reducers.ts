import { logoutAction } from './actions/logout.action';
import {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
} from './actions/login.action';
import { createReducer, on, Action } from '@ngrx/store';
import { AppStateInterface } from './types/appState.interface';

const initialState: AppStateInterface = {
  currentUser: null,
  isLoading: false,
  isLoggedIn: false,
  isSubmitting: false,
  errors: null,
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
  })
);

export function reducer(state: AppStateInterface, action: Action) {
  return appReducer(state, action);
}
