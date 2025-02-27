import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {User} from '../_models/user';
import {Observable, tap} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  #http = inject(HttpClient);
  baseUrl = environment.apiUrl;
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

  readCurrentUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.currentUser.set(user);
    }
  }

  

}
