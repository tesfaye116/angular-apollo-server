import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from '../../graphql/graphql.queries';

import {
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  loading: any = false;
  users: any = [];
  userss: any = {}
  error: any;
  name!: String;
  email!: String;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this.apollo
      .watchQuery<any>({
        query: GET_USERS,
      })
      .valueChanges.subscribe(({ data }) => {
        this.loading = false;
        this.users = data;
      });
  }

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  addUser() {
    this.apollo
      .mutate({
        mutation: ADD_USER,
        variables: {
          name: this.userForm.value.name,
          email: this.userForm.value.email,
        },
        refetchQueries: [
          {
            query: GET_USERS,
          },
        ],
      })
      .subscribe(({ data }: any) => {
        (this.users = data.createUser), this.userForm.reset();
      });
  }

  showEditUserForm(id: any) {
    console.log(id)
    this.apollo
    .watchQuery<any>({
      query: GET_USERS,
    })
    .valueChanges.subscribe(({ data }: any)=>{
      this.userss = data.users.filter((user: any) => user.id === id)

    })
  }






  deleteUser(id: any) {
    this.apollo
      .mutate({
        mutation: DELETE_USER,
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_USERS,
          },
        ],
      })
      .subscribe(({ data }: any) => {
        (this.users = data.deleteUser), this.userForm.reset();
      });
  }

  updateUser() {
    this.apollo
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          name: this.name,
          email: this.email,
        },
        refetchQueries: [
          {
            query: GET_USERS,
          },
        ],
      })
      .subscribe(({ data }: any) => {
        (this.users = data.updateUser), this.userForm.reset();
      });
  }
}