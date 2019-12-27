const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/order',(req,res) => {

   MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

            let data = {

                    _id:req.body.id,
                	market:req.body.market,
                	product_no:req.body.product,
                	cost:req.body.cost
                }

                if(err){
                	console.log("Error",err);
                }
                else{

                	let coll = client.db('Aamku').collection('Orders');

                	coll.insertOne(data,(err,resp) => {

                          if(err){
                          	console.log("Error",err);
                          }
                          else{

                          	res.send("Order generated");
                          	client.close();
                          }
                	});
                }

   });

});

module.exports = router;