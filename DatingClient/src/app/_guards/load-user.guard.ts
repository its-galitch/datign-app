import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AccountsService} from "../_services/accounts.service";

export const loadUserGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountsService);
  accountService.readCurrentUser();
  return true;
};
