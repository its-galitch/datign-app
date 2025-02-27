import { Component, OnInit, inject } from '@angular/core';
import {MembersService} from "../../_services/members.service";
import {Member} from "../../_models/member";
import {MemberCardComponent} from "../member-card/member-card.component";

@Component({
  selector: 'da-member-list',
  standalone: true,
  imports: [
    MemberCardComponent
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
  #membersService = inject(MembersService);
  members: Member[] = [];

  ngOnInit(): void {
    this.#loadMembers();
  }

  #loadMembers() {
    this.#membersService.getMembers().subscribe({
      next: members => this.members = members,
    });
  }

}
