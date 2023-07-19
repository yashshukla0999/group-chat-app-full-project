const express =require('express');
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const signupRoutes = require('./routes/index');

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(signupRoutes);




sequelize.sync()
.then((result)=>{
    console.log('database connected');
    app.listen(8000);

})
.catch((err)=>{
    console.log(err)
})