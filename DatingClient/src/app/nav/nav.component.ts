import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TitleCasePipe} from "@angular/common";


@Component({
  selector: 'da-nav',
  standalone: true,
  imports: [
    FormsModule,
    BsDropdownModule,
    RouterLink,
    RouterLinkActive,
    TitleCasePipe
  ],
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss"
})
export class NavComponent {
  #accountService = inject(AccountsService);
  #router = inject(Router);
  #toastrService = inject(ToastrService);
  userName = computed(() => this.#accountService.currentUser()?.username);
  isLoggedIn = computed(() => this.#accountService.currentUser() !== null);

  model:any = {};

  login() {
    this.#accountService.login(this.model)
    .subscribe({
      next: _ => {
        void this.#router.navigateByUrl('/members');
      },
      error:(error: any) => this.#toastrService.error(error.error)

    }
    );
    console.log(this.model);
  }

  logout() {
    this.#accountService.logout();
    void this.#router.navigateByUrl('/');
  }
}
