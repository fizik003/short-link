import { User } from './../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register() {}
  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/user/login', user);
  }
}
