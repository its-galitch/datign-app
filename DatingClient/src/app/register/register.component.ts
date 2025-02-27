import { Component, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'da-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  #accountService = inject(AccountService);
  #toastrService = inject(ToastrService);
  model: any = {};
  cancelRegister = output<boolean>();

  register(){
    this.#accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();        
      },
      error: error => this.#toastrService.error(error.error)
    });
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
