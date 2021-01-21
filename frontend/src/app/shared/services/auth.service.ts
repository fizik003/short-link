import { CurrentUserInterface } from './../../store/types/currentUser.interface';
import { LoginRequestInterface } from './../../store/types/loginRequest.interface';
import { User, UserReg } from './../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private token = null;
  constructor(private http: HttpClient) {}

  login(user: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<CurrentUserInterface>('/api/user/login', user).pipe(
      tap(({ token }) => {
        this.setToken(token);
      })
    );
  }

  register(user: UserReg): Observable<any> {
    return this.http.post('/api/user', user);
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http.get<CurrentUserInterface>('/api/user');
  }

  setToken(token: string) {
    // this.token = token;
    localStorage.setItem('auth-token', token);
  }

  getToken(): string {
    // return this.token;
    return localStorage.getItem('auth-token');
  }

  logout() {
    localStorage.clear();
  }
}
