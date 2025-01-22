import { Component, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'da-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  #accountService = inject(AccountsService);
  model: any = {};
  cancelRegister = output<boolean>();

  register(){
    this.#accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();        
      },
      error: error => console.log(error)
    });
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
