const User = require("../models/user");
const Chat = require("../models/chat");
const Group = require("../models/groupModel")
const UserGroup = require("../models/userGroup")

const Sequelize = require('sequelize')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const createGroup = async(req,res,next) =>{
    const groupName = req.body.groupName
    // console.log('inside a create gropp')
    // console.log(groupName)

    if(!groupName){
        res.status(400).json({message : "Required Group Name"})
    }
    try{
        const groupCreated = await Group.create({
            userId:req.user.id,
            groupName :groupName
    
        })
       // console.log(groupCreated);
        const userGroupInfo  = await UserGroup.create({
            userId : req.user.id ,
            groupId  : groupCreated.id
        })
        res.status(200).json({message  : "Successfully created group",groupId: groupCreated.id, groupName: groupCreated.groupName})

    }catch(error){
        console.log(error)
        res.status(500).json({message : "Unable to create group"})
    }
}

const getGroups = async(req,res,next) =>{
   // console.log("inside get groups>>>")
    try{
        const allGroups = await Group.findAll({where  : {userId : req.user.id}})
       // console.log("all groups are ???????" , allGroups)
        res.status(200).json({message : "Successfull" , groups : allGroups})


    }catch(error){
        console.log(error)
        res.status(500).json({message : "Unable to retrieve groups"})
    }
}

const getGroupMessages = async(req,res,next) =>{
    try{
        
        const groupId = req.query.groupId
        if(groupId==undefined){
            groupId=1;
        }
       // console.log("groupParams messages are >>>>>>>" , groupId)
        if (!groupId) {
            return res.status(400).json({ message: "Group ID is required" });
          }
        const messages = await Chat.findAll({
            where : {groupId : groupId},
            include: { 
                model: User ,
                attributes: ['name']
              }
        } )
      //  console.log("messages are>>>>>>>>>>" ,messages)
        res.status(200).json({ message: "Successfully retrieved group messages",messages : messages})



    }catch(error){
        console.log(error)
        res.status(500).json({message : "Unable to retrieve current group messages "})
    }
}
function uploadToS3(file) {

    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    })
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.name,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read'
    }
    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, s3response) => {
        if (err) {
          console.log("SOMETHING WENT WRONG", err)
          reject(err);
        }
        else {
          resolve(s3response.Location)
        }
      })
    })
  
  }
  exports.uploadFile = async (req, res, next) => {
    try {
      const groupId = req.params.groupId;
  
      console.log(">>>>>>>", req.files.file);
      const file = req.files.file;
      console.log(req.files);
      const fileURL = await uploadToS3(file);
      console.log(fileURL);
      if(req.params.groupId== 0)
      {
        const user = await req.user.createMsg({ name: req.user.username, message: fileURL });
        return  res.status(200).json({ message: user, success: true })  
        }
      const user = await req.user.createMsg({ name: req.user.username, message: fileURL, grpId: groupId });
      res.status(200).json({ message: user, success: true })
    }
  
    catch (err) {
      console.log(">>>>>>>>>>>>>>>", err);
      res.status(500).json({ message: "Something went Wrong", error: err, success: false })
    }
  }
  


module.exports={
    createGroup,
    getGroups,
    getGroupMessages


}