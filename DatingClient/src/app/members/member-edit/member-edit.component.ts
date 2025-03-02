import {Component, HostListener, inject, OnInit, viewChild} from '@angular/core';
import {Member} from "../../_models/member";
import {AccountService} from "../../_services/account.service";
import {MembersService} from "../../_services/members.service";
import {TabDirective, TabsetComponent} from "ngx-bootstrap/tabs";
import {FormsModule, NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'da-member-edit',
    standalone: true,
    imports: [
        TabDirective,
        TabsetComponent,
        FormsModule
    ],
    templateUrl: './member-edit.component.html',
    styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {


    member?: Member;
    #accountService = inject(AccountService);
    #membersService = inject(MembersService);
    #toastr = inject(ToastrService);
    editForm = viewChild<NgForm>('editForm');

    @HostListener('window:beforeunload', ['$event'])
    notify($event: any) {
        if(this.editForm()?.dirty) {
            $event.returnValue = true;
        }
    };

    ngOnInit(): void {
        this.#loadMember();
    }

    #loadMember() {
        const user = this.#accountService.currentUser();
        if (!user) return;

        this.#membersService.getMember(user.username).subscribe({
            next: member => this.member = member
        });
    }

    updateMember() {
        this.#membersService.updateMember(this.editForm()?.value).subscribe({
            next: _ => {

                this.#toastr.success('Profile updated successfully');
                this.editForm()?.reset(this.member);
            }
        })

    }


}
