const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    console.log("Connected to MongoDB")
})
.catch(error => {
    console.log("Error connecting to MongoDB")
})

const phonebookSchema = new mongoose.Schema({
    name: String,
    phonenumber: String
})

const Person = mongoose.model('Person', phonebookSchema)

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', phonebookSchema)
