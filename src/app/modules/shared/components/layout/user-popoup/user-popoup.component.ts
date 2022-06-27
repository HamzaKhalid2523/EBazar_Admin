import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-popoup',
  templateUrl: './user-popoup.component.html',
  styleUrls: ['./user-popoup.component.scss']
})
export class UserPopoupComponent implements OnInit {

  @Input() data;
  selectedUsers;
  popoverFilterVisible = false;

  constructor() { }

  ngOnInit(): void {
  }
  closePopOverFilter() {
    this.selectedUsers = [];
    this.popoverFilterVisible = false;
  }
  setSelectedUsers(users) {
    this.selectedUsers = users;
    this.popoverFilterVisible = true;
  }

}
