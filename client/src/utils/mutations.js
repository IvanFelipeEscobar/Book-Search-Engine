import {gql} from '@apollo/client'

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }`

  export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
  `

  export const SAVE_BOOK = gql`
  mutation saveBook($input: bookIn) {
    saveBook(input: $input) {
      savedBooks {
        Link
        bookId
        description
        title
        image
        authors
      }
      _id
      bookCount
      email
      username
    }
  }
  `
  export const REMOVE_BOOK = gql `
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      bookCount
      email
      username
      savedBooks {
        Link
        authors
        bookId
        description
        image
        title
      }
    }
  }`