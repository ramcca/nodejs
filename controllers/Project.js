const express = require('express');
const ProjectModel = require('../model/projectModel');
const projectRoutes = express.Router();

const getAllProjects = async () =>{
    try {
        const ProjectData = await ProjectModel.find();
        return {status:1,ProjectData};        
    } catch (error) {
        return {status:0,error};
    }
}

projectRoutes.route('/').get((req,res)=>{
    const data = getAllProjects();
    data.then((resolve,reject)=>{
        res.render('project/index',{headTitle:'Welcome to Project page',projectdata:resolve.ProjectData,menu:'project'});
    })
});


module.exports = projectRoutes;