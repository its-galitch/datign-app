import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from '../_models/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  #http = inject(HttpClient);
  #baseUrl =  environment.apiUrl;
  #usersDomain = 'users'

  getMembers(){
    return this.#http.get<Member[]>(this.#baseUrl + this.#usersDomain);
  }

  getMember(username: string) {
    return this.#http.get<Member>(this.#baseUrl + this.#usersDomain + `/${username}`);
  }

}
