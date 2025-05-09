const isDefaultMongoId = require("../utils/checkMongoId");
const Invitation = require("./../models/invitationsModel");
const Group = require("./../models/groupModel");
const User = require("./../models/userModel");

exports.sendInvitation = async (req, res) => {
  const { invitedUserId, invitedGroup, senderId } = req.body;
  if (!invitedUserId || !invitedGroup || !senderId) {
    return res.json({
      status: "fail",
      message: "Please fill all the required fields",
    });
  }
  const checkInvitedUserId = isDefaultMongoId(invitedUserId);
  const checkSenderId = isDefaultMongoId(senderId);
  const checkGroupId = isDefaultMongoId(invitedGroup);
  if (!checkInvitedUserId || !checkSenderId || !checkGroupId) {
    return res.json({
      status: "fail",
      message: "Invalid Ids",
    });
  }
  if (invitedUserId === senderId) {
    return res.json({
      status: "fail",
      message: "Feeling lonely huh. Sorry you can't invite yourself",
    });
  }
  const wantedGroup = await Group.findById(invitedGroup);
  if (!wantedGroup) {
    return res.json({
      status: "fail",
      message: "Group doesn't exist",
    });
  }
  if (wantedGroup.owner !== senderId) {
    return res.json({
      status: "fail",
      message:
        "You are not the owner of the group. You can't send invitations.",
    });
  }

  const checkInvitations = await Invitation.find({
    invitedUser: invitedUserId,
    invitedToGroup: invitedGroup,
  });
  if (checkInvitations.length !== 0) {
    return res.json({
      status: "fail",
      message: "You have already invited this user",
    });
  }
  const newInvitation = await Invitation.create({
    invitedUser: invitedUserId,
    invitedToGroup: invitedGroup,
  });
  return res.json({
    status: "success",
    data: {
      invitation: newInvitation,
    },
  });
};
exports.acceptInvitation = async (req, res) => {
  const { invitationId } = req.body;
  if (!invitationId) {
    return res.json({
      status: "fail",
      message: "No ID found",
    });
  }
  const wantedInvitation = await Invitation.findById(invitationId);

  const wantedGroup = await Group.findById(wantedInvitation.invitedToGroup);
  wantedGroup.members.push(wantedInvitation.invitedUser);
  const edittedGroup = await Group.findByIdAndUpdate(
    wantedGroup._id,
    {
      members: wantedGroup.members,
    },
    { new: true }
  );
  const invitedUser = await User.findById(wantedInvitation.invitedUser);

  invitedUser.groups.push(wantedGroup._id);
  const updatedUser = await User.findByIdAndUpdate(invitedUser._id, {
    members: invitedUser.groups,
  });
  const deletedInvitation = await Invitation.findByIdAndDelete(invitationId);
  return res.json({
    status: "success",
    data: {
      group: edittedGroup,
    },
  });
};
exports.rejectInvitation = async (req, res) => {
  const { id } = req.params;
  const deletedInvitation = await Invitation.findByIdAndDelete(id);
  return res.json({
    status: "success",
    message: "Invitation rejected successfully",
  });
};
exports.getUserInvitations = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({
      status: "fail",
      message: "An ID must be provided",
    });
  }
  const invitations = await Invitation.find({ invitedUser: id });
  return res.json({
    status: "success",
    data: {
      invitations,
    },
  });
};
