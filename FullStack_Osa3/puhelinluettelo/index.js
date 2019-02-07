const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

//initialize phonebook

let persons = [


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

app.get('/', (req, res) => {
    res.send('<h1>Nothing to see here</h1>')
})

//request for all persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

//info for the app
app.get('/info', (req, res) => {
    res.send(`<div>Puhelinluettelossa ${persons.length} henkilön tiedot</div><div>${Date()}</div>`)
})

//request single person by id
app.get('/api/persons/:id', (req, res) => {
    res.json(persons.find(person => person.id === Number(req.params.id)))
})

//delete single person
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end();
})

//add single person
app.post('/api/person', (req, res) => {

    //randomize id (1k bit overkill maybe)
    const id = Math.floor(Math.random() * 1000)

    const body = req.body

    //checks for name and number
    if (body.name === undefined || body.number === '') {
        return res.status(400).json({ error: 'name missing' })
    }

    if (body.number === undefined || body.number === '') {
        return res.status(400).json({ error: 'number missing' })
    }

    //function to check if name is in the phonebook
    function personExists(Name) {
        return persons.some(function (el) {
            return el.name.toLowerCase() === Name.toLowerCase()
        })
    }

    if (personExists(body.name)) {

        return res.status(400).json({ error: 'name already exists' })

    } else {

        const person = {
            name: body.name,
            number: body.number,
            id: id
        }

        persons = persons.concat(person)
        res.json(person)
    }

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
})
