import {Component, signal} from '@angular/core';
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'da-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  registerMode = signal<boolean>(false);

  users: any[] = [];

  registerToggle() {
    this.registerMode.update(mode => !mode);
  }

  cancelRegisterMode() {
    this.registerMode.set(false);
  }



}
