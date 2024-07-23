const express = require('express');
const movieModel = require('../model/movieModal');
const movieRoute = express.Router();

const getAllMovie = async (filter,sortFlag=false) =>{
    try {
        let MovieData;
        if(!sortFlag){
            MovieData = await movieModel.find(filter,{'name':1,'poster_image':1,'release_date':1});
        }else{
            MovieData = await movieModel.find(filter,{'name':1,'poster_image':1,'release_date':1}).sort([['ratings',-1]]).skip(0).limit(3).exec();
        }
        return {status:1,MovieData};        
    } catch (error) {
        return {status:0,error};
    }
}

movieRoute.route('/').get((req,res)=>{
    let filter = {};
    const data = getAllMovie(filter,false);
    data.then((resolve,reject)=>{
        res.render('movies/index',{headTitle:'Welcome to Movies page',MovieData:resolve.MovieData,error:null,movie_name:'',menu:'movie'});
    })
});

movieRoute.route('/').post((req,res)=>{
    let movieName = req.body.movie_name;
    console.log(req.body.top_ratted);
    let dt = new Date();
    console.log(`${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}`);
    
    if(typeof req.body.top_ratted != undefined && req.body.top_ratted == 1){
        console.log('in filter IF');
        const data = getAllMovie({},{field:'ratings',orderBy:-1});
        data.then((resolve,reject)=>{
            console.log('Filter record resolved');
            console.log(reject);
            
            res.render('movies/index',{headTitle:'Welcome to Movies page',MovieData:resolve.MovieData,error:'',movie_name:movieName,menu:'movie'});
            return;
        })
    }else if(movieName == ''){
        res.render('movies/index',{headTitle:'Welcome to Movies page',MovieData:[],error:'Movie Name Required',movie_name:'',menu:'movie'});
        return;
    }else{
        let filter = {'name':movieName};
        const data = getAllMovie(filter);
        data.then((resolve,reject)=>{
            res.render('movies/index',{headTitle:'Welcome to Movies page',MovieData:resolve.MovieData,error:'',movie_name:movieName,menu:'movie'});
            return;
        })
        
    }
    

    /*
    const data = getAllProjects();
    data.then((resolve,reject)=>{
        res.render('project/index',{headTitle:'Welcome to Project page',projectdata:resolve.ProjectData});
    })
    */
});
module.exports = movieRoute;