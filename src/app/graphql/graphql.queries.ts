import { gql } from 'apollo-angular';

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

//For POST Query and Mutation
const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      published
      author {
        name
        email
      }
    }
  }
`;

//Post Quary and Mutation
const ADD_POST = gql`
  mutation createPosts(
    $title: String!
    $content: String!
    $published: Boolean!
    $author: ID!
  ) {
    createPosts(
      title: $title
      content: $content
      published: $published
      author: $author
    ) {
      id
      title
      content
      published
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePosts(
    $id: ID!
    $title: String!
    $content: String!
    $published: Boolean!
    $author: ID!
  ) {
    updatePost(
      id: $id
      title: $title
      content: $content
      published: $published
      author: $author
    ) {
      id
      title
      content
      published
    }
  }
`;

const DELETE_POST = `
  mutation deletePosts($id: ID!){
    deletePosts(id: $id){
      title
    }
  }
`;

export {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
};
