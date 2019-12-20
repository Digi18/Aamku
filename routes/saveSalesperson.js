const express = require('express');
const router = express.Router();
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

   MongoClient.connect(dburl,{useNewUrlParser:true,UseUnifiedTopology:true},(err,client) => {

       var data = {

            _id:req.body.id,
             username:req.body.username,
             password:req.body.password,
             type:req.body.type
          };
                
                  if(err){
                  	console.log("Error",err);
                  }
                  else{

                    let coll = client.db('Aamku').collection('Users');

                    coll.find({_id:req.body.id},function(err,user){

                               if(err){
                               	console.log("Error",err);
                               }
                               else{
                               	   res.end("Updated successfully");
                               }
                    });
                  }
   });

   module.exports = router;