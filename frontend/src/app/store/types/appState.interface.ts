import { BackendErrorsInterface } from './backendError.interface';
import { CurrentUserInterface } from './currentUser.interface';
export interface AppStateInterface {
  isLoading: boolean;
  isLoggedIn: boolean;
  isSubmitting: boolean;
  currentUser: null | CurrentUserInterface;
  errors: BackendErrorsInterface | null;
}
