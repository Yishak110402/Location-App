const User = require("../models/userModel");
const Group = require("./../models/groupModel");
const isDefaultMongoId = require("./../utils/checkMongoId");

exports.createGroup = async (req, res) => {
  const { name, ownerId } = req.body;
  if (!name) {
    return res.json({
      status: "fail",
      message: "You must provide a group name",
    });
  }
  if (!ownerId) {
    return res.json({
      status: "fail",
      message: "No Owner ID",
    });
  }

  const validId = isDefaultMongoId(ownerId);
  if (!validId) {
    return res.json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  const checkGroup = await Group.find({
    owner: ownerId,
    name: name,
  });

  if (checkGroup.length !== 0) {
    return res.json({
      status: "fail",
      message: "You already own a group with that name",
    }); 
  } 
 
  const newGroup = await Group.create({ 
    name,
    owner: ownerId,
    members: [ownerId]
  });

  const ownerUser = await User.findById(ownerId)
  const newGroupsList = ownerUser.groups.push(newGroup._id)
  const updatedUser = await User.findByIdAndUpdate(ownerId, {groups: newGroupsList})

  return res.json({
    status: "success",
    data: {
      group: newGroup,
    },
  });
};
exports.leaveGroup = async(req, res)=>{
  const {id} = req.params
  const {memberId} = req.body
  const wantedGroup = await Group.findById(id)
  const newMembersList = wantedGroup.members.filter((member)=>{
    return member._id !== memberId
  })
  wantedGroup.members = newMembersList
  const edittedGroup = await Group.findByIdAndUpdate(id, {
    members: newMembersList
  }, {new: true})
  return res.json({
    status:'success',
    message:"Group left successfully"
  })
}
exports.deleteGroup = async(req, res)=>{
  const {id} = req.params
  if(!id){
    return res.json({
      status:"fail",
      message:"No ID provided"
    })
  }
  const validId = isDefaultMongoId(id)
  if(!validId){
    return res.json({
      status:"fail",
      message:"Invalid ID"
    })
  }
  const deletedGroup = await Group.findByIdAndDelete(id)
  console.log(deletedGroup);
  
  if(!deletedGroup){
    return res.json({
      status:"fail",
      message:"Couldn't find group"
    })
  }
  const containingUsers = await User.updateMany({groups: id},{$pull:{groups: id}})
  console.log(containingUsers);
  
  return res.json({
    status:"success",
    message:"Deleted Successfully"
  })
}
exports.fetchUserGroups = async(req, res)=>{
  const {userId} = req.params
  if(!userId){
    return res.json({
      status:"fail",
      message:"You need to provide an ID"
    })
  }
  const usersGroups = await Group.find({members: userId})
  return res.json({
    status:"success",
    data:{
      groups: usersGroups
    }
  })
}
exports.getGroupDetails = async(req, res)=>{
  const {id} = req.params
  if(!id){
    return res.json({
      status:"fail",
      message:"No ID Provided"
    })
  }
  const isValidId = isDefaultMongoId(id)
  if(!isValidId){
    return res.json({
      status:"fail",
      message:"The ID provided is invalid"
    })
  }
  const wantedGroup = await Group.findById(id)
  if(!wantedGroup){
    return res.json({
      status:'fail',
      message:"We weren't able to find the group"
    })
  }
  return res.json({
    status:"success",
    data:{
      group: wantedGroup
    }
  })
}