require('dotenv').config()

const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const { response } = require('express')
const { validate } = require('./models/person')
morgan.token('body', (req, res) => JSON.stringify(req.body));



const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :response-time ms :body '));


app.get('/welcome', (req, res) => {
    res.send("<h1>Hello welcome to phonesbook</h1>")
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(result => {
            if (result) {
                res.json(result)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))

})

app.get('/info', (req, res) => {
    Person.countDocuments().exec((err, count) => {
        if (err) {
            res.send(err)
            return
        }
        res.send(`
            <p>Phonebook has info for ${count} people </p>
            <p>${new Date()}</p>`
        )
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    console.log("heyy", req.body)
    const userInfo = req.body

    const person = new Person({
        name: userInfo.name,
        phonenumber: userInfo.phonenumber
    })

    person.save()
        .then(savedPerson => {
            return res.json(savedPerson)
        })
        .catch(error => {
            next(error)
        })

})

app.put('/api/persons/:id', (req, res, next) => {
    const updatedPerson =
    {
        name: req.body.name,
        phonenumber: req.body.phonenumber,
    }

    Person.findOneAndUpdate({ name : req.body.name }, updatedPerson, {returnOriginal: false})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})


const errorHandler = (error, req, res, next) => {

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    }
    next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



