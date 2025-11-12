import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  public user: any = null;

  constructor(private http: HttpClient, private router: Router) {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.decodeAndSetUser(token);
    }
  }

  private decodeAndSetUser(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.user = payload;
      localStorage.setItem(this.tokenKey, token);
    } catch (e) {
      this.logout();
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>('/auth/login', credentials).pipe(
      tap((res) => {
        if (res.access_token) {
          this.decodeAndSetUser(res.access_token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.user = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}