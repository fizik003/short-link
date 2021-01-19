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
  private token = null;
  constructor(private http: HttpClient) {}

  login(user: LoginRequestInterface): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/user/login', user).pipe(
      tap(({ token }) => {
        console.log(token);
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      })
    );
  }

  register(user: UserReg): Observable<any> {
    return this.http.post('/api/user', user);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
