import { CreateLinkRequestInterface } from './../../store/types/createLink.interface';
import { LinkResponseInterface } from './../../store/types/linkResponse.interface';
import { LinkUpdateRequestInterface } from './../../store/types/linkUpdateRequest.interface';
import { Link, LinkFromServer } from './../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  constructor(private http: HttpClient) {}

  create(link: CreateLinkRequestInterface): Observable<LinkResponseInterface> {
    return this.http.post<LinkResponseInterface>('/api/link', link);
  }

  getByLinkId(linkId: number): Observable<LinkFromServer> {
    return this.http.get<LinkFromServer>(`/api/link/${linkId}`);
  }

  update(
    linkData: LinkUpdateRequestInterface
  ): Observable<LinkResponseInterface> {
    return this.http.put<LinkResponseInterface>('/api/link', linkData);
  }

  get(): Observable<any> {
    return this.http.get('/api/link');
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`/api/link/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get('/api/link/stats');
  }
}
