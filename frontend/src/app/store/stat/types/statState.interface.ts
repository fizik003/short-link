import { BackendErrorsInterface } from './../../types/backendError.interface';
export interface StatStateInterface {
  countLink: number;
  countAllRedirect: number;
  isLoading: boolean;
  errors: BackendErrorsInterface | null;
}
