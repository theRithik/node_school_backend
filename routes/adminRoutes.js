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

//register user
router.post('/login',(req,res)=>{
client.connect((dberr,dbres)=>{
    if(dberr){
        console.log(dberr)
    }
    else{
    const db = dbres.db('test')
    db.collection('admin').findOne({email:req.body.email}, function(err,user){
        if(err){
            console.log(err)
        }
       if(user){
            res.status(304).send("please use different email")
            console.log(user)
        }
        else{
            const hashedPassword= bcrypt.hashSync(req.body.password,8)
            const userCreate = {
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:hashedPassword
            }
            db.collection('admin').insertOne(userCreate,(err,result)=>{
                if(err){
                    console.log(err)
                }
                else{
        
                    res.status(200).send({auth:true,token:"successfull"})
                }
        
            })
            }
        })
        }
    })
  
})


router.post('/addStudent',(req,res)=>{
    client.connect((dberr,dbres)=>{
        if(dberr){
            console.log(dberr)
        }
        else{
            const db = dbres.db('test')
            db.collection('students').findOne({register:req.body.register}, function (err,user){
             if(err) return res.status(500).send('Error on the server.');

             else {
                if(!user){
                    const haspassword= bcrypt.hashSync(req.body.password?req.body.password:'test',8)
                      const userCreate = {
                        register:req.body.register,
                        isActive:req.body.active?req.body.active:true,
                        leave:req.body.leave?req.body.leave:false,
                        password:haspassword
                    }
                    db.collection('students').insertOne(userCreate,(err,result)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                
                            res.status(200).send({auth:true,token:"successfull"})
                        }
                    })
                    }
                    else{
                   res.status(304).send({auth:false,token:"number is already in use"})
                   console.log(user)
                    }
                }
                })
                
                }
            })
                
    })

    router.post('/posting',(req,res)=>{
        client.connect((dberr,dbres)=>{
            if(dberr){
                console.log(dberr)
            }
            else{
                const db = dbres.db('test')
                db.collection('timetable').insertOne(req.body,(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.status(200).send("successfull")
                    }
                })
            }
        })
    })
    router.post('/posting/notifications',(req,res)=>{
        client.connect((dberr,dbres)=>{
            if(dberr){
                console.log(dberr)
            }
            else{
                const db = dbres.db('test')
                db.collection('notification').insertOne(req.body,(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.status(200).send('successfull')
                    }
                })
            }
        })
    })
    router.post('/posting/exampass',(req,res)=>{
        client.connect((dberr,dbres)=>{
            if(dberr){
                console.log(dberr)
            }
            else{
                const db = dbres.db('test')
                db.collection('exampass').insertOne(reg.body,(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.status(200).send("successfull")
                    }
                })
            }
        })
    })
    router.post('/posting/changeFaculty',(req,res)=>{
        client.connect((dberr,dbres)=>{
            if(dberr){
                console.log(dberr)
            }
            else{
                const db = dbres.db('test')
                db.collection('faculty').insertOne(req.body,(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.status(200).send("successfull")
                    }
                })
            }
        })
    })

    router.put('/updating',(req,res)=>{
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

    module.exports=adminRoutes