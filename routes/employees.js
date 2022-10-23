const express = require('express')
const route = express.Router()
const employee_model = require('../models/employee_model')

route.post('/employees', async(req, res) => {
 
    if(req.body.content) {
        return res.status(400).send({
            message: "Employee content cannot be empty"
        });
    }
    

    try {
        const employee = new employee_model(req.body)
        await employee.save()
        res.status(201).send(employee)
    }
    catch(error) {
        res.status(500).send(error)
    }
});


route.get('/employees', async(req, res) => {
    try {
        const employees = await employee_model.find()
        res.status(200).send(employees)
    }
    catch(error) {
        res.status(500).send(error)
    }
});



route.get('/employees/:eid', async(req, res) => {
  
    if(req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }
    
    try {
        const employee = await employee_model.findById(req.params.eid)
        res.status(200).send(employee)
    }
    catch(error) {
        res.status(500).send(error)
    }
    
});

route.put('/employees/:eid', async(req, res) => {
   
    if(req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }
    try {
        console.log(req.body)
        const updatedEmployee = await employee_model.findByIdAndUpdate(req.params.eid, req.body)
    
        await updatedEmployee.save()
        res.status(202).send(req.body)
      } catch (err) {
        res.status(500).send(err)
      }
    
});

route.delete('/employees/:eid', async (req, res) => {
   
    if(req.body.content) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    try {
        const employee = await employee_model.findByIdAndDelete(req.params.eid)
    
        if (!employee) { 
            res.status(404).send("No item found")
        }
        res.status(204).send(employee)
      } catch (err) {
        res.status(500).send(err)
      }
});
module.exports = route

