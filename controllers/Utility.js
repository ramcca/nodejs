const express = require('express');
const utilityController = express.Router();
utilityController.route('/').get((req,res)=>{
    res.render('utility/index',{headTitle:'Welcome to Utility Page',menu:'utility'})
});

utilityController.route('/email').get((req,res)=>{

    try{
    
    res.render('utility/email',{headTitle:'Welcome to Email Page',message:'Email send successfully',menu:'utility'})
    }
    catch(e){
        res.render('utility/email',{headTitle:'Welcome to Email Page',message:e.message,menu:'utility'})
    }


    
});

module.exports = utilityController;