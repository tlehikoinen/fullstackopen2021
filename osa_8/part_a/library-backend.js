const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { v1: uuid } = require('uuid')


const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

/*
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  }
]
*/

const typeDefs = gql`
  type Author {
      name: String!
      born: Int
      bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors(name: String): [Author!]!
      me: User
      allGenres: [String!]
  },
  type Mutation {
      addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String!]!
      ): Book,

      editAuthor(
          name: String!
          setBornTo: Int!
      ): Author,

      createUser(
        username: String!
        favoriteGenre: String
      ): User,

      login(
        username: String!
        password: String!
      ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author === undefined && (args.genre === undefined || args.genre === "all") ) {
        return await Book.find({}).populate('author')
      }
      if (args.author === undefined) {
        return await Book.find({genres: {$elemMatch : {$all: args.genre}}}).populate('author')
      }
      const existingAuthor = await Author.findOne({name : args.author})
      if (args.genre === undefined) {
        return await Book.find({author: existingAuthor.id}).populate('author')
      }
      return await Book.find({ author : existingAuthor.id, genres: {$in : [args.genre]}}).populate('author')
      //return (books.filter(b => b.author.includes(args.author))).filter(b => b.genres.some(b => b.includes(args.genre)))
    },

    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      const books = await Book.find({})

      authors.map(a => {
        let bookCount = 0
        books.forEach(b => {
          if (String(b.author) === String(a._id)) {
            bookCount++
          }
        })
        a.bookCount = bookCount
      })
      if (args.name === undefined) {
        return authors
      }
      return authors.filter(a => a.name.includes(args.name))
    },

    me: (root, args, context) => {
      return context.currentUser
    },

    allGenres: async (root, args) => {
      const books = await Book.find({})
      const uniqueGenres = new Set()
      books.forEach(b => b.genres.forEach(genre => uniqueGenres.add(genre)))
      console.log([...uniqueGenres])
      const genres = [...uniqueGenres]
      return genres

    }
  },

  Mutation: {
    
    addBook: async (root, args, context) => {
      if (!context.currentUser){
        return new UserInputError('Validation failed')
      }
      let book = { ...args }
      const authorExists = await Author.findOne({ name: args.author })
      if (authorExists === null) {
        const author = new Author({
          name: args.author
        })
        try {
          const savedAuthor = await author.save()
          book = { ...book, author: savedAuthor.id }
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args})
        }
      } else {
          book = { ...book, author: authorExists.id }
        } 

        try {
          const newBook = new Book({ ...book })
          await newBook.save()
          return await Book.findOne({_id: newBook._id}).populate('author')
        } catch (error) {
            throw new UserInputError(error.message, { invalidArgs: args })
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser){
        return new UserInputError('Validation failed')
      }
      try{
      const author = await Author.findOne({ name: args.name })
      return await Author.findByIdAndUpdate({_id: author.id}, {born: args.setBornTo }, {new: true}, )
      } catch (error) {
        throw new UserInputError(error.message, {invalidArgs: args})
      }
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return await user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
  
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== process.env.SECRET ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})