const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Employee = require('./models/employee.model');
const Department = require('./models/department.model');

const PORT = process.env.PORT || 5000

const connstr = 'mongodb://maruf:maruf@ds133920.mlab.com:33920/apitesting'

mongoose.connect(connstr);


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) =>  res.send('Hello World!'));

app.get('/employee', (req, res) => {
    Employee.find({})
    .exec((err, employees) => {
        if(err){
            res.send('error while find employee :' + err);
        } else {
            console.log(employees);
            res.json(employees);
        }
    })
});

app.get('/employee', (req, res) => {
    Employee.findOne({})
        .exec((err, employees) => {
            if (err) {
                res.send('error while find employee :' + err);
            } else {
                console.log(employees);
                res.json(employees);
            }
        })
});

app.post('/employee', (req, res) => {
    var employee = new Employee({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        bob: req.body.dob,
        department: req.body.department
    });
    
    employee.save((err, employee) => {
        if (err) {
            res.send('error while saving employee : ' + err);
        } else {
            console.log(employee);
            res.json(employee);
        }

    });
    
});



app.listen(PORT, () => console.log('Server start listening on port 8080'));