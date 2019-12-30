const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/getTotalCost',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

        let data = {
               id:req.body.id   
        };

        if(err){
            console.log("Error",err);
        }
        else{

          let coll = client.db('Aamku').collection('Orders');

          coll.find({user_id:data.id}).toArray((err,result) => {

                if(err){

                    console.log("Error",err);
                }
                else{

                    let output = result.map(r => ({'cost':r.cost}));
                    
                    res.send(output);
                    client.close();
                }
            });
        }
    });

});

module.exports = router;