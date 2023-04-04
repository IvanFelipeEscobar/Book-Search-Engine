import {gql} from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }`

  export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
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
  mutation saveBook($input: savedBook!) {
    saveBook(input: $input) {
      _id
      email
      username
      savedBooks {
        link
        bookId
        description
        title
        image
        authors
      }
    }
  }
  `
  export const REMOVE_BOOK = gql `
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId){
      _id
      email
      username
      savedBooks {
        link
        authors
        bookId
        description
        image
        title
      }
      }
    }`