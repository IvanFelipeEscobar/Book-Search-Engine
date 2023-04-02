import {gql} from '@apollo/client'

export const GET_ME = gql`
query Me {
    me {
      _id
      username
      email
      bookCount
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