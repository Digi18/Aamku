const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/saveSalesperson',(req,res) => {

     var data = {

             _id:req.body.id,
             email:req.body.username,
             password:req.body.password,
             type:req.body.type
          };

   MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                  if(err){
                  	console.log("Error",err);
                  }
                  
                  else{	

                  client.db('Aamku').collection('Users').findOne({email:req.body.username},function(err,user){

                               if(err){
                               	console.log("Error",err);
                               }
                              if(user){
                               	   res.send("User exists");
                               }
                             
                                else{

                        let collection = client.db("Aamku").collection("Users");

                        collection.insertOne(data,(err,resp) => {
                                
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