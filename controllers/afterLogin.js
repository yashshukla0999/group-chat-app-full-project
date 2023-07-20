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
       const result = await Chat.create({
        chat:userMessage,
        //userID:req.user.id
        
       });
        console.log('result'+result)
        res.status(200).json({message:"chat massage sent" ,data:result});

    }


    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Unable to send message" });
      }
    
}

const getChatMessage = async (req,res)=>{

    try{
        //const lastMessageId = parseInt(req.query.lastMessageId) || 0;
        //console.log("lastMessageID >>>>>>>>>>>>>>>>>>>>" , lastMessageId)
        //console.log("group id is >>>>",req.query.groupId)
       // const  groupId = req.query.groupId
        const userMessage = await Chat.findAll()
          console.log("User MEssage >>>>>>>>>>>>>>>.",userMessage)
          res.status(200).json({userMessage : userMessage})



      }catch(error){
          console.log(error)
          res.status(400).json({message : 'Unable to fetch messages'})
      }

}




  
  module.exports={
    showForm,
    chatMessage,
    getChatMessage
  }