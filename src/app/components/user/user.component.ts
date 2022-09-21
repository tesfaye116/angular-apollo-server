import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }    
  }
`;

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
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
  modalRef: MdbModalRef<ModalComponent> | null = null;

  name: string = '';
  email: string = '';

  loading: any = false;
  users: any = [];

  constructor(private apollo: Apollo, private modalService: MdbModalService) { }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent)
  }
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

  createUser() {
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        name: this.name,
        email: this.email
      }
    }).subscribe(({ data }) => {
      this.loading = false;
      this.name = '';
      this.email = '';
      this.getAllUsers();
    }, (error) => {
      this.loading = false;
      console.log('there was an error sending the query', error);
    });
  }


}