import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../_services/account.service";

export const loadUserGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  accountService.readCurrentUser();
  return true;
};
