const express = require('express')
const router = express.Router()
const bodyparser = require('body-parser')
const {MongoClient} = require('mongodb')
const bcrypt = require('bcryptjs')
const url="mongodb+srv://testing:test123@cluster1.vnynuru.mongodb.net/?retryWrites=true&w=majority"



router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());


const client =new MongoClient(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})


router.put('/addDetails',(req,res)=>{
    client.connect((dberr,dbres)=>{
        if(dberr){
            console.log(dberr)
        }
        else{
            const db = dbres.db('test')
            const query = {register:req.body.register}
            const query2 = {$set:req.body}
            db.collection('students').updateOne(query,query2, function(err,result){
                if(err){
                    console.log(err)
                }
                else{
                    res.send(result)
                }
            })
        }
    })
})

module.exports= studentRoutes