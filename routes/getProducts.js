const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/getProducts',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                let data = {

                	name:req.body.name
                }

                    if(err){
                    	console.log("Error",err);
                    }
                    else{
                       
                       let coll = client.db('Aamku').collection('Market');

                       coll.find({market_name:data.name}).toArray((err,result) => {

                                 if(err){
                                 	console.log("Error",err);
                                 }
                                 else{

                                 	let output = result.map(r => ({'market':r.market_name,'product_no':r.product_no,
                                                   'page':r.page,'mrp':r.mrp,'inner_pack':r.inner_pack,'outer_pack':r.outer_pack}));

                                 	res.send(output);
                                 	client.close();
                                 }
                       }); 

                    }
    });

});

module.exports = router;
