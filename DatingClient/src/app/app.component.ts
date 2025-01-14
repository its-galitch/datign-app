import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'da-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <h1>Welcome to {{title}}!</h1>

   {{users | json}}
    <ul>
   @for (user of users; track user.id) {
    <li>{{user.id}} - {{user.userName}}</li>
   }

   </ul>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'dating-app';
  users: any [] = [];

  ngOnInit() {
    this.http.get('https://localhost:5001/api/users')
    .subscribe({
      next: resopnse => this.users = resopnse as any [],
      error: error => { console.log(error)},
      complete: () => { console.log('Request has completed') }
    });

  }


}
