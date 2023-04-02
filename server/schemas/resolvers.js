const {AuthenticationError} = require(`apollo-server-express`)
const { User } = require(`../models`)
const {signToken} = require(`../utils/auth`)

const resolvers = {
    Query: {
       me: async (parent, args, context) => {
       if (context.user){
        return await User.findOne({ _id: context.user._id }).select('-__v -password')
       }
       throw new AuthenticationError('You need to be logged in!')
     }   
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password})
            const token = signToken(user)
            return {token, user}
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email})
            if(!user){
                throw new AuthenticationError(`no user found with that email`)
            }
            const validPassword = await user.isCorrectPassword(password)
            if (!validPassword) {
                throw new AuthenticationError(`Wrong Password`)
            }
            const token = signToken(user)
            return {token, user}
        }
    }
}
module.exports = resolvers