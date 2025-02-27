import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'da-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.scss'
})
export class TestErrorsComponent {
  baseUrl = environment.apiUrl;
  #http = inject(HttpClient);
  validationErrors: string[] = [];

  get400Error() {
    this.#http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get401Error() {
    this.#http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get404Error() {
    this.#http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  get500Error() {
    this.#http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }


  get400ValidationError() {
    this.#http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: response => console.log(response),
      error: errors => {
        console.log(errors);
        this.validationErrors = errors;
      }
    });
  }


}
