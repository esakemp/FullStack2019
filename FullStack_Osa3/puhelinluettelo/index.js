require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

//initialize phonebook

let persons2 = [


    {
        "name": "Arto Hellas",
        "number": "0404-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }


]

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
app.get('/info', (req, res) => {
    res.send(`<div>Puhelinluettelossa ${persons2.length} henkilön tiedot</div><div>${Date()}</div>`)
})

//request single person by id
app.get('/api/persons/:id', (req, res) => {
    res.json(persons2.find(person => person.id === Number(req.params.id)))
})

//delete single person
app.delete('/api/persons/:id', (req, res) => {

    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

//add single person
app.post('/api/persons', (req, res) => {

    //randomize id (1k bit overkill maybe)
    const id = Math.floor(Math.random() * 1000)

    const body = req.body

    //checks for name and number
    if (body.name === undefined || body.name === '') {
        return res.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined || body.number === '') {
        return res.status(400).json({ error: 'number missing' })
    }

    //function to check if name is in the phonebook
    function personExists(Name) {
        return persons2.some(function (el) {
            return el.name.toLowerCase() === Name.toLowerCase()
        })
    }



    const person = new Person({
        name: body.name,
        number: body.number,
        id: id
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })


})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
})
