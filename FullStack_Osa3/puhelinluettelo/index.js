if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

//initialize phonebook


app.use(bodyParser.json())
morgan.token('object', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status - :response-time ms :object'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('<h1>Nothing to see here</h1>')
})

//request for all persons
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

//info for the app
app.get('/info', (req, res, next) => {
    Person.find({}).then(persons => {
        res.send(`<div>Puhelinluettelossa ${persons.length} henkilön tiedot</div><div>${Date()}</div>`)
    }).catch(error => next(error))
})

//request single person by id
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person.toJSON())
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

//delete single person
app.delete('/api/persons/:id', (req, res, next) => {

    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

//add single person
app.post('/api/persons', (req, res, next) => {

    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    }).catch(error => next(error))
})

//update existing person
app.put('/api/persons/:id', (req, res, next) => {

    const body = req.body

    Person.findOneAndUpdate({ name: body.name }, { $set: { number: body.number } }, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
})
