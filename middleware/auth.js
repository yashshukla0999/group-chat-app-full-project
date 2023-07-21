const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.authenticate=(req,resp,next)=>{
    try{
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token,'yashsecretkey')
        console.log(user);
        console.log('userID>>>>>>',user.userID)
        User.findByPk(user.userID.userID).then(result => {
           console.log(result+'erajngeeeeeeeggggggggggggggggggggg')
            req.user = result;
           
            next();
        })
        
        .catch((err)=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
        return resp.status(401)
    }
}
