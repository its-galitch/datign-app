import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";



export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  if(accountService.currentUser())
  {
    return true;
  } else {
    toastr.error("You must be logged in!");
    router.navigate(['/']);
    return false;
  }
};
