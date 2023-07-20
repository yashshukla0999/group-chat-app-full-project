const express =require('express');
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const signupRoutes = require('./routes/index');
const afterLoginRoutes = require('./routes/afterLogin')

const User  = require('./models/user')

const Chat = require('./models/chat')

app.use(cors({
    origin:'*'
    
}));
app.use(bodyParser.json({ extended: false }));
app.use(signupRoutes);
app.use(afterLoginRoutes);

// User.hasMany(Chat);
//  Chat.belongsTo(User);


sequelize.sync()
.then((result)=>{
    console.log('database connected');
    app.listen(8000);

})
.catch((err)=>{
    console.log(err)
})