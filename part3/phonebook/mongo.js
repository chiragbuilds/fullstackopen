const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Fullstackopen:${password}@cluster0.cplly2d.mongodb.net/phonebookDB?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const ContactSchema = new mongoose.Schema({
  name : String,
  number : String,
})

const Contact = mongoose.model('Contact', ContactSchema)

async function getContacts() {
  console.log('phonebook:')
  Contact.find().then(contact => {
    contact.map(c => console.log(`${c.name} ${c.number}`))
    mongoose.connection.close()
  })

}

if(process.argv.length === 3){
  getContacts()
}
else{
  const contact = new Contact({
    name: `${process.argv[3]}`,
    number: `${process.argv[4]}`,
  })

  contact.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}


