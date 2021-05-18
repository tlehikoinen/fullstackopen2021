const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@fso.aqlqw.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phonebookSchema = new mongoose.Schema({
    name: String,
    phonenumber: String
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length == 5) {
    const person = new Person({
        name: process.argv[3],
        phonenumber: process.argv[4]
    })
    person.save().then(response => {
        console.log(`Added ${response.name} number ${response.phonenumber} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(note => {
            console.log(`${note.name} ${note.phonenumber}`)
        })
        mongoose.connection.close()
    })

}


