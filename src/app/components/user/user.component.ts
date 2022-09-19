import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

@Component({

  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loading: any = false;
  users: any = []

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this.apollo.watchQuery<any>({
      query: GET_USERS
    }).valueChanges.
      subscribe(({ data }) => {
        this.loading = false;
        this.users = data;
        console.table(this.users.users)
      });
  }

}