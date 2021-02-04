import { BackendErrorsInterface } from './../../types/backendError.interface';
import { CurrentUserInterface } from './../../types/currentUser.interface';
export interface UserStateInterface {
  currentUser: null | CurrentUserInterface;
  isLoadding: boolean;
  isLoggedIn: boolean;
  errors: null | BackendErrorsInterface;
}
