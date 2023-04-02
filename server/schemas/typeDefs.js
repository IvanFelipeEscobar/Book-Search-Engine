const {gql} = require(`apollo-server-express`)

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Books]
    }
    type Book {
        authors: String
        description: String
        bookId: String
        image: String
        Link: String
        title: String
    }
    type Auth {
        token: ID!
    }
    type Query {
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook
    }
`
module.exports = typeDefs