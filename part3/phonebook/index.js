const express = require('express')
var morgan = require('morgan')

const app = express()
app.use(express.json())

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateID = () => {
  return Math.floor(Math.random() * 100000)
}

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
      "id": "5",
      "name": "Luffy", 
      "number": "9829829828"
    }
]

app.get('/', (req, res)=>{
    res.send("HELL YEAH")
})

app.get('/api/persons', (req, res)=>{
    res.status(200).json(persons)
})

app.get('/info', (req, res) => {
    const requestedTime = new Date()
    res.send( `<p>Phonebook has info for ${persons.length} people</p><p>${requestedTime}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.filter(person => person.id === id)
  person.length > 0 ? res.json(person) : res.status(400).end()

})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(200).end()
})


app.post('/api/persons', (req, res) => {
  const body = req.body
  if(!body.name || !body.number){
    return res.status(400).json({ error: "information missing"})
  }

  if(persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())){
    return res.status(400).json({error: "name must be unique"})
  }

  const newPerson = {
    id: generateID(),
    name: body.name,
    number: body.number
  }
  console.log(newPerson);
  persons = persons.concat(newPerson)
  res.status(200).end()
})

const PORT = 3001

app.listen(PORT, (req, res)=>{
    console.log(`App running on port ${PORT}`)
    console.log(`URL: http://localhost:${PORT}`)
    
})