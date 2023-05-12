const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const cors = require('cors')
const adminRoutes = require('./routes/adminRoutes') 
const studentRoutes = require('./routes/studentRoutes')
const port = process.env.PORT||5000

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())

app.use('/admin',adminRoutes)
app.use('/student',studentRoutes)


app.listen(port,()=>{
    console.log(`in port ${port}`)
})