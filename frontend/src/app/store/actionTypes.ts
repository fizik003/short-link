export enum ActionTypes {
  LOGIN = '[App] Login',
  LOGIN_SUCCESS = '[App] Login success',
  LOGIN_FAILURE = '[App] Login failure',

  LOGOUT = '[App] Logout',

  GET_CURRENT_USER = '[App] get current user',
  GET_CURRENT_USER_SUCCESS = '[App] get current user success',
  GET_CURRENT_USER_FAILURE = '[App] get current user failure',

  UPDATE_LINK = '[App] Update Link',
  UPDATE_LINK_SUCCESS = '[App] Update Link success',
  UPDATE_LINK_FAILURE = '[App] Update Link failure',

  LINK_CLICKS_ADD = '[App] Add one click om link',

  CREATE_LINK = '[App] Create link',
  CREATE_LINK_SUCCESS = '[App] Create link success',
  CREATE_LINK_FAILURE = '[App] Create link failure',

  DELETE_LINK = '[App] Delete link',
  DELETE_LINK_SUCCESS = '[App] Delete link success',
  DELETE_LINK_FAILURE = '[App] Delete link failure',
}
