const path = require('path');
const Chat =require('../models/chat')
const Sequelize = require('sequelize')

const showForm = (req, resp) => {

    resp.sendFile(path.join(__dirname, '../views/afterLogin.html'));
  }

const chatMessage = async(req,res)=>{
    try{
        console.log("bodyof message is >>>>>>>" ,req.body)
        const userMessage = req.body.message;

console.log(userMessage)
       const result =  await req.user.createChat({
        chat:userMessage,
        userID:req.user.id
        
       });
        console.log('result'+result)
        res.status(200).json({message:"chat massage sent" ,data:result});

    }


    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to send message" });
      }
    
}






  
  module.exports={
    showForm,
    chatMessage
  }