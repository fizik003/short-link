import { Link, LinkFromServer } from './../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private http: HttpClient) {}

  create(link: Link): Observable<any> {
    return this.http.post('/api/link/create', link);
  }

  getByLinkId(linkId: number): Observable<LinkFromServer> {
    return this.http.get<LinkFromServer>(`/api/link/${linkId}`);
  }

  update(linkData: {
    linkId: number;
    description?: string;
    tag?: string;
  }): Observable<any> {
    return this.http.put('/api/link/update', linkData);
  }
}
