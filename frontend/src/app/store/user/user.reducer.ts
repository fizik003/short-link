import { createReducer, on, Action } from '@ngrx/store';
import { UserStateInterface } from './types/userState.interface';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './user.action';

const initialState: UserStateInterface = {
  currentUser: null,
  isLoadding: false,
  isLoggedIn: false,
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
  })
);

export function reducer(state: UserStateInterface, action: Action) {
  return userReducer(state, action);
}
