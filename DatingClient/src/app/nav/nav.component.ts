import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'da-nav',
  standalone: true,
  imports: [
    FormsModule,
    BsDropdownModule
  ],
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss"
})
export class NavComponent {
  #accountService = inject(AccountsService);
  isLogedIn = computed(() => this.#accountService.currentUser() !== null);

  model:any = {};

  login() {
    this.#accountService.login(this.model)
    .subscribe({
      next: (response:any) => {
        console.log(response);       
      },
      error:(error: any) => console.log(error)

    }
    );
    console.log(this.model);
  }

  logout() {
    this.#accountService.logout();
  }
}
