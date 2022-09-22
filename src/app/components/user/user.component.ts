import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../../graphql/graphql.queries';

import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  loading: any = false;
  users: any = [];
  editUser: any = {};
  isadd!: Boolean;
  isedit!: Boolean;


  error: any;

  constructor(private apollo: Apollo) { }

  openAddForm() {
    this.isadd = true;
    this.isedit = false;
  }
  openEditForm() {
    this.isedit = true;
    this.isadd = false;
  }
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

}