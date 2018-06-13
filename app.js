const express = require('express');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
const xml = require('xml');
const mongoose = require('mongoose');
const InforOrder = require('./models/infororder.model');
const HRSubmission = require('./models/hrsubmission.model');
const CustomAPI = require('./models/customapi.model');
const Employee = require('./models/employee.model');
const Department = require('./models/department.model');

const PORT = process.env.PORT || 5000

const connstr = 'mongodb://maruf:maruf@ds133920.mlab.com:33920/apitesting'

mongoose.connect(connstr);


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(bodyParser.xml());

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

app.get('/infororder', (req, res) => {
    InforOrder.find({})
        .exec((err, infororders) => {
            if (err) {
                res.send('error while find employee :' + err);
            } else {
                console.log(infororders);
                res.json(infororders);
            }
        })
});

app.post('/infororder', (req, res) => {
    var infororder = new InforOrder({
        date: req.body.date,
        description: req.body.description,
        location: req.body.location
    });

    infororder.save((err, infororder) => {
        if (err) {
            res.send('error while saving inforOrder : ' + err);
        } else {
            console.log(infororder);
            res.json(infororder);
        }

    });

});

app.get('/hrsubmission', (req, res) => {
    HRSubmission.find({})
        .exec((err, hrsubmission) => {
            if (err) {
                res.send('error while find hrsubmission :' + err);
            } else {
                console.log(hrsubmission);
                res.json(hrsubmission);
            }
        })
});

app.post('/hrsubmission', (req, res) => {
    var hrsubmission = new HRSubmission({
        name: req.body.name,
        position: req.body.position,
        profiledetails: req.body.profiledetails
    });

    hrsubmission.save((err, hrsubmission) => {
        if (err) {
            res.send('error while saving HR Submission : ' + err);
        } else {
            console.log(hrsubmission);
            res.json(hrsubmission);
        }

    });

});

app.get('/customapi', (req, res) => {
    CustomAPI.find({})
        .exec((err, customapis) => {
            if (err) {
                res.send('error while find hrsubmission :' + err);
            } else {
                console.log(customapis);
                res.json(customapis);
            }
        })
});

app.post('/customapi', (req, res) => {
    console.log(req.body);
    var customapi = new CustomAPI({
        runway: req.body.runway,
        contaminents: req.body.contaminents,
        airportname:req.body.airportname
    });
  

    customapi.save((err, customapi) => {
        if (err) {
            res.send('error while saving HR Submission : ' + err);
        } else {
            console.log(customapi);
            res.json(customapi);
        }

    });

});


app.post('/customapixml', (req, res, body) => {
    console.log(req.body);
    //console.log(req.body.customapi.contaminents[0].contaminent[0].contamcode);
    //res.type('application/xml');
    //res.send(xml(req.body));
    var customapi = new CustomAPI({
        contaminents: [],
        airportname: req.body.customapi.airport[0]
    });
    if (req.body.customapi.contaminents[0].contaminent.length>0){
        req.body.customapi.contaminents[0].contaminent.forEach(element => {
            customapi.contaminents.push({contamcode: element.contamcode[0], cleared: element.cleared[0]})
        });
    }
   


    customapi.save((err, customapi) => {
        if (err) {
            res.send('error while saving HR Submission : ' + err);
        } else {
            console.log(customapi);
            res.type('text/xml');
            res.send(xml(customapi));
        }

    });

});




app.listen(PORT, () => console.log('Server start listening on port ' + PORT));