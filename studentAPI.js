const express = require('express');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let getCount = 0
let postCount = 0
let putCount = 0
let deleteCount = 0
app.use((req, res, next) => {
  if (req.method === 'GET') {
    console.log(`Request count: ${++getCount} and Method type: ${req.method}`)
  }
  if (req.method === 'POST') {
    console.log(`Request count: ${++postCount} and Method type: ${req.method}`)
  }
  if (req.method === 'PUT') {
    console.log(`Request count: ${++putCount} and Method type: ${req.method}`)
  }
  if (req.method === 'DELETE') {
    console.log(`Request count: ${++deleteCount} and Method type: ${req.method}`)
  }
  next()
})


const students = [{ id: 1, name: 'Bret Hart', section: 'first', gpa: 3, nationality: 'Canada' },
{ id: 2, name: 'Savio Vega', section: 'second', gpa: 4, nationality: 'Peurto Rico' },
{ id: 3, name: 'Yokozuna', section: 'third', gpa: 2, nationality: 'Japan' },
{ id: 4, name: 'Hulk Hogan', section: 'fourth', gpa: 1, nationality: 'America' },
{ id: 5, name: 'Crush', section: 'fifth', gpa: 5, nationality: 'Hawaii' }]



app.post('/students/add', (req, res) => {
    let newStudent = {
        id: parseInt(req.body.id),
        name: req.body.name,
        section: req.body.section,
        gpa: parseFloat(req.body.gpa),
        nationality: req.body.nationality
    }
    students.push(newStudent);
    res.send(students)
});

app.get('/students', (req, res) => {
    res.send(students);
});

app.get('/students/:id', (req, res) => {
    let student = students.find(function (student) {
        return student.id === parseInt(req.params.id);
    });
    res.send(student);
});

app.put('/students/put/:id', (req, res) => {
    let student = students.find(function (student) {
        if (student.id === parseInt(req.params.id))
        {return true}
    });


    let studentUpdate = {
        id: parseInt(req.body.id),
        name: req.body.name,
        section: req.body.section,
        gpa: parseFloat(req.body.gpa),
        nationality: req.body.nationality
    }
    let index = students.indexOf(student)
    students[index] = studentUpdate
    res.send(students)

})

app.delete('/students/delete/:id', (req, res)=>{

    let student = students.find(function (student) {
        if (student.id === parseInt(req.params.id))
        {return true}
    });
    
    let index = students.indexOf(student)
    students.splice(index, 1)
    res.send(students)

})


const server = app.listen(6969, function () {
    console.log('Server is ON')
})