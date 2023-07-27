const express =require('express');
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
// const http = require('http').createServer(app); // Use 'http' to create the server.
const io = require('socket.io')(3000,{
    cors:{
        origin:'http://localhost:8000'
    }
});
const signupRoutes = require('./routes/index');
const afterLoginRoutes = require('./routes/afterLogin')
const groupRoutes = require('./routes/group')
const adminRoutes = require('./routes/admin')

const User  = require('./models/user')

const Chat = require('./models/chat')
const Group = require("./models/groupModel")
const UserGroup = require("./models/userGroup")
app.use(cors({
    origin:'*'
    
}));
const fileupload=require('express-fileupload');
console.log('insideeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee socetttttttttttttttttttttttttttttttttttttttttttt')
io.on('connection', socket=>{
    
    console.log(socket.id)
    //console.log('coustom-event')
    socket.on('send-message', (data) => {
    console.log(data.chat); // 
 
  socket.broadcast.emit('result',(data))
});
  console.log('yash socket')
})

app.use(bodyParser.json({ extended: false }));
io.on('connection', (socket) => {
    socket.on('send-message', (room) => {
      io.emit('receive-message', room);
    });
  });
  
app.use(signupRoutes);
app.use(afterLoginRoutes);
app.use(groupRoutes);
app.use(adminRoutes)

User.hasMany(Chat);
 Chat.belongsTo(User);

 Group.hasMany(Chat)
Chat.belongsTo(User)

// User.belongsToMany(Group, { through: 'userGroup', foreignKey: 'userId' });
// Group.belongsToMany(User, { through: 'userGroup', foreignKey: 'groupId' });


User.belongsTo(Group , { through : UserGroup})
Group.belongsTo(User , { through : UserGroup})

sequelize.sync()
.then((result)=>{
    console.log('database connected');
    app.listen(8000);

})
.catch((err)=>{
    console.log(err)
})