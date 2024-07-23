const express = require('express');
const empModel = require('../model/employee');
const emp = express.Router();

const getfun = async (req,res)=>{
    let message = (typeof req.query.success != undefined && req.query.success != '' && req.query.success == 1)?'Employee information saved successfully.':0;
    let Data = [];
    try {
        await empModel.find().sort([['_id', -1]]).exec().then( response => {
            Data=response;
        })
    } catch (error) {
        message = 'Something went wrong';
    }

    res.render('employee/index',{headTitle:'Welcome to Movies page',employeeData:Data,menu:'emp',message});
    
}

const postFun = async (req,res)=>{
    let data = {name:req.body.name,projectId:1};
    await empModel.create(data).then(response=>{
        res.redirect('/employee?success=1');
    });
}

emp.route('/').get(getfun);
emp.route('/').post(postFun);
module.exports = emp;