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
  const newGroup = await Group.create({
    name,
    owner: ownerId,
  });

  return res.json({
    status: "success",
    data: {
      group: newGroup,
    },
  });
};
