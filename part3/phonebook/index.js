const express = require('express')
var morgan = require('morgan')
// const cors = require('cors')


const app = express()
app.use(express.json())
// app.use(cors())

app.use(express.static('dist'))


const Contact = require('./models/phonebook')

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateID = () => {
  return (Math.floor(Math.random() * 100000)).toString()
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
  Contact.find().then(response => res.status(200).json(response))
    // res.status(200).json(persons)
})

app.get('/info', (req, res) => {
    const requestedTime = new Date()
    res.send( `<p>Phonebook has info for ${persons.length} people</p><p>${requestedTime}</p>`)
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  // const person = persons.filter(person => person.id === id)
  // person.length > 0 ? res.json(person) : res.status(400).end()

  Contact.findById(id)
    .then(response => {
      if(!response){
        return res.status(404).json({error: 'content not found'})
      }
      res.json(response)
    })
    .catch(error => {
      // res.status(400).json({error : "Invalid ID"})
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const person = {}
  Contact.findByIdAndDelete(id)
    .then(result => {
      if(!result){
        return res.status(404).json({error : 'content might have already deleted'})
      }
      console.log('Deleted contact : ', result)
      res.json(result)
    })
    .catch(error => next(error))
  
  // const person = persons.find(person => person.id === id)
  // persons = persons.filter(person => person.id !== id)
  // res.json(person).status(200)
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if(!body.name || !body.number){
    return res.status(400).json({ error: "information missing"})
  }

  // if(persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())){
  //   return res.status(400).json({error: "name must be unique"})
  // }

  // const newPerson = {
  //   id: generateID(),
  //   name: body.name,
  //   number: body.number
  // }
  // console.log(newPerson);
  // persons = persons.concat(newPerson)
  
  // res.json(newPerson)

  const contact = new Contact({
    name: body.name,
    number: body.number
  })
  contact
    .save()
    .then(response => res.json(response))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  if(!req.body){
    return res.status(400).json({error: 'content missing'})
  }
  Contact.findById(req.params.id)
    .then(result => {
      result.name = req.body.name
      result.number = req.body.number

      return result.save()
    })
    .then(updatedResult => res.json(updatedResult))
    .catch(error => console.log(error))
})

// Error handle middleware -
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

   if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, (req, res)=>{
    console.log(`App running on port ${PORT}`)
    console.log(`URL: http://localhost:${PORT}`)
    
})