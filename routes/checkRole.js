const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/checkRole',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

       var data = {

             _id:req.body.id,
          };
              
              if(err){
              	console.log("Error",err);
              }
              else{

                let coll = client.db('Aamku').collection('Users');

                coll.find({_id:data._id}).toArray((err,result) => {

                              if(err){
              	                  console.log("Error",err);
                                 }
                               else{
                                 
                                  let output = result.map(r => ({'type':r.type}));

                                         res.send(output);
                                         client.close();  
                               }  
                     });
              }

    });

});

module.exports = router;