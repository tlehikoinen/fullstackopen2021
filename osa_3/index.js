const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

const app = express()
app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body '));


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        phonenumber: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        phonenumber: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abromov",
        phonenumber: "12-43-234345"
    }
]

app.get('/', (req, res) => {
    res.send("<h1>Hello welcome to phonebook</h1>")
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        console.log(person)
        res.json(person)
    }
    else {
        res.status(404).send(`Could not find user with id ${id}`)
    }
})

app.get('/info', (req, res) => {
    res.send(`
      <p>Phonebook has info for ${persons.length} people </p>
      <p>${new Date()}</p>`
    )
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    console.log("heyy",req.body)
    const nextId = getRandomId()
    const userInfo = req.body

    const errorMsg = sentInfoErrorMsg(userInfo)
    const errorJson = {userInfo, errorMsg }
    console.log("error",errorMsg)

    if (errorMsg.length !== 0) {
        res.json(errorJson)
    }
    else {
        userInfo.id = nextId
        persons = persons.concat(userInfo)
        res.json(userInfo)
    }
})

const sentInfoErrorMsg = (userInfo) => {
    const errorMessages = []
    if ([undefined, null, ""].includes(userInfo.name))
        errorMessages.push("Error with name")
    if ([undefined, null, ""].includes(userInfo.phonenumber))
        errorMessages.push("Error with number")
    if (persons.find(p => p.name === userInfo.name))
        errorMessages.push("Name must be unique")

    return errorMessages
}

const getNextId = () => {
    const currentBiggestId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
    return currentBiggestId + 1
}

const getRandomId = () => {
    const randomId = Math.floor((Math.random() * 10000))
    return randomId
}



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)