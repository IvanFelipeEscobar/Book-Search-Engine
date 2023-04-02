const {gql} = require(`apollo-server-express`)

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        Link: String
        title: String
    }
    input bookIn {
        authors: [String]
        description: String
        bookId: String
        image: String
        Link: String
        title: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input: bookIn): User
        removeBook(bookId: String!): User
    }
`
module.exports = typeDefs