const { User } = require(`../models`)

const resolvers = {
    Query: {
        getSingleUser: async () => await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
          })

    },
    Mutation: {
        createUser: {

        }
    }
}
module.exports = resolvers