const sequelize = require('../util/database');
const User = require('../models/user'); // Import the User model
const Group = require('../models/groupModel'); // Import the Group model
const UserGroup = require('../models/userGroup'); // Import the Admin model
const userGroup = require('../models/userGroup');

const makeGroupAdmin = async (req, res) => {
  try {
  //  console.log("make group admin of message is >>>>>>>" ,req.body)
        const userMessage = req.body.groupId;

      //  console.log(userMessage)
    // Check if the user is already an admin for the provided group
    const existingAdmin = await UserGroup.findOne({
      where: { groupId: req.body.groupId, userId: req.body.userId },
    });
    // console.log(userId);
    //console.log('makeGroupAdmin');
   

    if (existingAdmin) {
      return res.status(400).json({ error: 'User is already an admin for this group.' });
    }

    await UserGroup.create({
        groupId: req.body.groupId,
      userId: req.body.userId,
    });
     

    res.status(200).json({ message: 'User is now an admin for the group.'});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const checkAdmin = async (req, res) => {
  try {
    let userId = req.query.userId || req.user.id; // If userId is not provided, use the authenticated user ID

    const groupAdmin = await UserGroup.findOne({
      where: { groupId: req.query.groupId, userId },
    });

    res.status(200).json({ isAdmin: !!groupAdmin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const getGroupAdmins = async (req, res) => {
  try {
    const groupAdmins = await UserGroup.findAll({
      where: { groupId: req.query.groupId },
    });
    res.status(200).json(groupAdmins);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

 const makeNewAdmin = async (req, res) => {
  try {
    // Check if the user is already a global admin
    const existingAdmin = await UserGroup.findOne({ where: { userId: req.body.userId } });

    if (existingAdmin) {
      return res.status(400).json({ error: 'User is already a global admin.' });
    }

    await userGroup.create({
      userId: req.body.userId,
    });

    res.status(200).json({ message: 'User is now a global admin.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

const removeAdmin = async (req, res) => {
  try {
    await UserGroup.destroy({
      where: { userId: req.body.userId },
    });

    res.status(200).json({ message: 'Admin privileges are removed from the user.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
 module.exports={
    makeGroupAdmin,
    checkAdmin,
    getGroupAdmins,
    makeNewAdmin,
    removeAdmin



 }