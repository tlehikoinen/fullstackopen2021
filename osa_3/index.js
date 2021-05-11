const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abromov",
        number: "12-43-234345"
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
    const nextId = getRandomId()
    const userInfo = req.body

    const errorMsg = sentInfoErrorMsg(userInfo)
    const errorJson = {errorMsg}

    if(errorMsg.length !== 0){
        res.status(400).json(errorJson)
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
    if([undefined, null, ""].includes(userInfo.number))
        errorMessages.push("Error with number")
    if(persons.find(p => p.name === userInfo.name))
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


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)