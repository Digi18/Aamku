const express = require('express');
const router = express.Router();
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.post('/saveSalesperson',(req,res) => {

   MongoClient.connect(dburl,{useNewUrlParser:true,UseUnifiedTopology:true},(err,client) => {

       var data = {

           // _id:req.body.id,
             email:req.body.username,
             password:req.body.password,
             type:req.body.type
          };
                
                  if(err){
                  	console.log("Error",err);
                  }
                  else{

                    let coll = client.db('Aamku').collection('Users');

                    coll.find({email:req.body.username},function(err,user){

                               if(err){
                               	console.log("Error",err);
                               }
                               if(user){
                               	   res.end("User exists");
                               }
                                else{

                        var collection = mongo.con.db("Aamku").collection("Users");

                        coll.insertOne(data,(err,resp) => {
                                
                               if(err){
                                   
                                   console.log("Error:".red +err);
                                   
                               }  
                               else{

                                   res.send("User created");
                               }

                         });

                       }
                    });
                  }
         });

   });

   module.exports = router;