import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly tokenKey = 'auth-token';
  private readonly isAdmin = 'auth-admin';
  private readonly idUser = 'auth-id';

  login(email: string, password: string): Observable<{ token: string, user: any }> {
    return this.http.post<{ token: string, user: any }>(
      `${environment.apiUrl}/auth/login`,
      { email, password }
    ).pipe(
      tap((response: any) => {
        this.saveToken(`${response.data.tokenType} ${response.data.token}`);
        this.saveIsAdmin(response.data.isAdmin);
        this.setIdUser(response.data.userId);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users`, {
      username,
      email,
      password
    });
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.tokenKey, token);
    }
  }



  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  saveIsAdmin(isAdmin: boolean): void {
    // Armazenamento seguro considerando diferentes ambientes
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.isAdmin, isAdmin.toString());
    }
  }

  getIsAdmin(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const isAdmin = localStorage.getItem(this.isAdmin);
      return isAdmin === 'true' ? true : false;
    }
    return null;
  }

  getIdUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const idUser = localStorage.getItem(this.idUser);
      return idUser;
    }
    return null;
  }
  setIdUser(id: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.idUser, id);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.isAdmin);
    }
  }

  getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}