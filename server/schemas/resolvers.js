const {AuthenticationError} = require(`apollo-server-express`)
const { User } = require(`../models`)
const {signToken} = require(`../utils/auth`)

const resolvers = {
    Query: {
       me: async (parent, args, context) => {
       if (context.user){
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')
       return userData
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
        },
        saveBook: async (parent, {input}, context) => {
            if(context.user){
                const addBook = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks: input}},
                    {new: true}
                )
                return addBook
            }
            throw new AuthenticationError(`Must be logged in to save books`)
        },
        removeBook: async (parent, args, context) => {
            if(context.user){
                const rmBook = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: args.bookId}},
                    {new: true}
                )
                return rmBook
            }
            throw new AuthenticationError(`Must be logged in to remove books`)
        }
    } 
}
module.exports = resolvers