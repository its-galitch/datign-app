import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from '../_models/member';
import {Observable, of, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  #http = inject(HttpClient);
  #baseUrl =  environment.apiUrl;
  #usersDomain = 'users';
  members = signal<Member[]>([]);

  getMembers(){
    return this.#http.get<Member[]>(this.#baseUrl + this.#usersDomain).subscribe({
      next: members => this.members.set(members)
    });
  }

  // getMember(username: string) {
  //   return this.#http.get<Member>(this.#baseUrl + this.#usersDomain + `/${username}`);
  // }


  getMember(username: string): Observable<Member> {
    const member = this.members().find(member => member.userName == username);
    if(member !== undefined) return of(member);
    return this.#http.get<Member>(this.#baseUrl + this.#usersDomain + `/${username}`);
  }

  updateMember(member:Member) {
    return this.#http.put(this.#baseUrl + 'users', member).pipe(
        tap(()=> {
          this.members.update(members => members
              .map(m => m.userName === member.userName ? member : m))
        })
    );
  }

}
