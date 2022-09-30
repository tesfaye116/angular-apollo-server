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
  users: any = [];
  editUser: any = {};
  isadd!: Boolean;
  isedit!: Boolean;

  isSuccess!: Boolean;
  isDelete!: Boolean;
  isUpdated!: Boolean;

  error: any;

  constructor(private apollo: Apollo) {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.apollo
      .watchQuery<any>({
        query: GET_USERS,
      })
      .valueChanges.subscribe(({ data }) => {
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
        this.isSuccess = true;
        (this.users = data.createUser), this.userForm.reset();
      });
  }

  showEditForm(user: any) {
    this.openEditForm();
    this.editUser = user;
    this.userForm.setValue({
      name: user.name,
      email: user.email,
    });
  }

  updateUser() {
    this.apollo
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          id: this.editUser.id,
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
        this.isUpdated = true;
        this.users = data.updateUser;
        this.userForm.reset();
        this.getAllUsers();
      });
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
        this.isDelete = true;
        this.users = data.deleteUser;
        this.getAllUsers();
      });
  }

  openAddForm() {
    this.isadd = true;
    this.isedit = false;
    this.userForm.reset();
  }
  openEditForm() {
    this.isedit = true;
    this.isadd = false;
  }

  closeForm() {
    this.isadd = false;
    this.isedit = false;
  }
}
