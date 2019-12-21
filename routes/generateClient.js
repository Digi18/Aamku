const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/generateClient',(req,res) => {

           var data = {

             party_name:req.body.name,
             address:req.body.address,
             gst:req.body.gst,
             day:req.bosy.day,
             month:req.body.month,
             vendor:req.body.vendor
          };

  MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) =>{

                       if(err){
                       	console.log("Error",err);
                       }
                       else{

                       	let coll = client.db('Aamku').collection('Clients');

                       	coll.insertOne(data,(err,resp) => {

                       		 if(err){
                                   
                                   console.log("Error:".red +err);
                                   
                               }  
                               else{

                                   res.send("Client generated");
                               }
                        });
                       
                   }
  });

});

module.exports = router;