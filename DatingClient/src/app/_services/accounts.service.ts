import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../_models/user';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  #http = inject(HttpClient);
  baseUrl = "https://localhost:5001/api/";
  currentUser = signal<User | null>(null);  

  login(model: any): Observable<User> {
    return this.#http.post<User>(this.baseUrl + 'account/login', model)
      .pipe(
        tap(user => {
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              this.currentUser.set(user as User);              
            }
          }
        )
      );
  }

  register(model: any): Observable<User> {
    return this.#http.post<User>(this.baseUrl + 'account/register', model)
      .pipe(
        tap(user => {
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              this.currentUser.set(user as User);              
            }
          }
        )
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.currentUser.set(user);
    }
  }

  

}
