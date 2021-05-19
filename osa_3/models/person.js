const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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
    name: {
        type: String,
        unique: true,
        minlength: 3,
        required: true
    },
    phonenumber: { 
        type: String,
        minlength: 8,
        required: true
    }
})

phonebookSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', phonebookSchema)

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', phonebookSchema)
