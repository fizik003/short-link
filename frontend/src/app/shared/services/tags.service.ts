import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getTag(tag: string): Observable<any> {
    return this.http.get(`/api/tag/${tag}`);
  }
}
