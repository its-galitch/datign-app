import { Component, inject, OnInit, signal } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'da-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  #http = inject(HttpClient);

  registerMode = signal<boolean>(false);

  users: any[] = [];

  ngOnInit() {
    this.getUsers();
  }

  regiterToggle() {
    this.registerMode.update(mode => !mode);
  }

  cancelRegisterMode() {
    this.registerMode.set(false);
  }

  getUsers() {
    this.#http.get('https://localhost:5001/api/users')
    .subscribe({
      next: resopnse => this.users = resopnse as any[],
      error: error => { console.log(error) },
      complete: () => { console.log('Request has completed') }
    });
  }


}
