import { gql } from 'apollo-angular'

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation createUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;



export { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER }