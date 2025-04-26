import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../shared/models/user.model';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getAll(page = 1, pageSize = 10): Observable<{ data: User[] }> {
    return this.http.get<{ data: User[] }>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
