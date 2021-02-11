import { createReducer, on, Action } from '@ngrx/store';
import { StatStateInterface } from './types/statState.interface';
import {
  getStatisticAction,
  getStatisticFailureAction,
  getStatisticSuccessAction,
} from './stat.actions';

const initialState: StatStateInterface = {
  countAllRedirect: 0,
  countLink: 0,
  errors: null,
  isLoading: false,
};

const reducer = createReducer(
  initialState,
  on(getStatisticAction, (state) => {
    return {
      ...state,
      isLoading: true,
      errors: null,
    };
  }),
  on(getStatisticSuccessAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      countAllRedirect: action.statisticCurrentUser.countAllRedirect,
      countLink: action.statisticCurrentUser.countLink,
    };
  }),
  on(getStatisticFailureAction, (state, action) => {
    return {
      ...state,
      isLoading: false,
      errors: action.error,
    };
  })
);

export function statReducer(state: StatStateInterface, action: Action) {
  return reducer(state, action);
}
