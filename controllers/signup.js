const path = require('path');
const User = require('../models/user')
const bcrypt = require('bcrypt');


const showForm = (req, resp) => {

    resp.sendFile(path.join(__dirname, '../views/index.html'));
  }

 const postUser = async (req, resp) => {
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPhone = req.body.phone
    const userPassword = req.body.password;
    try {
      if (userName == undefined || userName.length === 0 || userEmail.length === 0 ||
        userEmail == undefined
        || userPassword.length === 0 || userPassword == undefined ||userPhone==undefined||userPhone.length===0) {
        return resp.status(400).json({ err: "bad parameters" })
      }
      const user = await User.findOne({
        where: {
          email: userEmail
        }
      });
  
      if (user) {
        return resp.status(202).json({ massage: "email already register" });
      }
  

      bcrypt.hash(userPassword, 10, async (err, hash) => {
        console.log(err)
        await User.create({
          name: userName,
          email: userEmail,
          phone:userPhone,
          password: hash
        })
        resp.status(201).json({ massage: 'user created successfully' });
  
      })
    }
  
    catch (err) {
      console.log('Error:', err);
      resp.status(500).json({ err: 'email already register' });
    };
  
  
  
  }












  module.exports={
    showForm,
    postUser
  }