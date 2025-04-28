const User = require("./../models/userModel");
const validate = require("validator");
const bcrypt = require("bcryptjs");
const isDefaultMongoId = require("./../utils/checkMongoId");
const isValidUsername = require("../utils/validateUsername");

exports.createUser = async (req, res) => {
  if (!req.body) {
    return res.json({
      status: "fail",
      message: "No Body",
    });
  }
  const { name, email, password, username, gender } = req.body;
  if (!name) {
    return res.json({
      status: "fail",
      message: "A name must be provided",
    });
  }
  if (!email) {
    return res.json({
      status: "fail",
      message: "An email must be provided",
    });
  }
  if (!password) {
    return res.json({
      status: "fail",
      message: "You must enter a password",
    });
  }
  if (!username) {
    return res.json({
      status: "fail",
      message: "Please enter a username",
    });
  }
  if (!gender) {
    return res.json({
      status: "fail",
      message: "You must enter your gender",
    });
  }

  const validEmail = validate.isEmail(email);
  if (!validEmail) {
    return res.json({
      status: "fail",
      message: "You must enter a valid email address",
    });
  }

  if (password.length < 8) {
    return res.json({
      status: "fail",
      message: "Password must be at least 8 characters",
    });
  }

  const validUserName = isValidUsername(username);
  if (!validUserName.isValid) {
    return res.json({
      status: "fail",
      message: validUserName.errors,
    });
  }
  const usernameCheck = await User.findOne({ username });
  if (usernameCheck) {
    return res.json({
      status: "fail",
      message: "Username is already taken.",
    });
  }
  console.log(gender.toLowerCase());

  if (gender.toLowerCase() !== "male" && gender.toLowerCase() !== "female") {
    return res.json({
      status: "fail",
      message: "Please enter valid gender values",
    });
  }
  const checkUser = await User.find({ email });
  if (checkUser.length !== 0) {
    return res.json({
      status: "fail",
      message: "This email is already in use",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    username,
    gender: gender.toLowerCase(),
  });
  return res.json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.json({
      status: "fail",
      message: "You must provide an email",
    });
  }
  if (!password) {
    return res.json({
      status: "fail",
      message: "You must enter a valid password",
    });
  }
  if (password.length < 8) {
    return res.json({
      status: "fail",
      message: "Password must be at least 8 characters",
    });
  }
  const wantedUser = await User.find({ email });
  if (wantedUser.length === 0) {
    return res.json({
      status: "fail",
      message: "No user is registered to this email",
    });
  }
  const user = wantedUser[0];
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.json({
      status: "fail",
      message: "Incorrect Password",
    });
  }
  return res.json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.editUserDetails = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({
      status: "fail",
      message: "No ID has been provided",
    });
  }
  const validId = isDefaultMongoId(id);
  if (!validId) {
    return res.json({
      status: "fail",
      message: "The ID provided is not a valid ID",
    });
  }

  console.log(Object.keys(req.body).length);
  if (Object.keys(req.body).length === 0) {
    return res.json({
      status: "fail",
      message: "No data provided",
    });
  }
  const checkUser = await User.find({ _id: id });
  if (checkUser.length === 0) {
    return res.json({
      status: "fail",
      message: "No User has been found",
    });
  }

  if (req.params.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    req.params.password = hashedPassword;
  }
  const edittedUser = await User.findByIdAndUpdate(
    id,
    { ...req.body },
    {
      new: true,
    }
  );
  return res.json({
    status: "success",
    data: {
      user: edittedUser,
    },
  });
};

exports.fetchUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({
      status: "fail",
      message: "You must provide an ID",
    });
  }
  const validId = isDefaultMongoId(id);
  if (!validId) {
    return res.json({
      status: "fail",
      message: "Invalid ID provided",
    });
  }
  const wantedUser = await User.findById(id);
  if (!wantedUser) {
    return res.json({
      status: "fail",
      message: "No user found",
    });
  }
  return res.json({
    status: "success",
    data: {
      user: wantedUser,
    },
  });
};

exports.findUserByUsername = async (req, res) => {
  const {username} = req.params;
  if (!username) {
    return res.json({
      status: "fail",
      message: "No username provided",
    });
  }
  const exp = new RegExp("^" + username);
  const queryResult = await User.find({
    username: exp,
  });
  return res.json({
    status: "success",
    data: {
      result: queryResult,
    },
  });
};

exports.verifyUser = async(req, res)=>{
  const {user} = req.body
  if(!user){
    return res.json({
      status:"fail",
      message:"You need to provide the user details"
    })
  }
  const checkUser = await User.findOne({email: user.email})
  if(!checkUser){
    return res.json({
      status:"fail",
      message:"Email changed"
    })
  }
  const sentPassword = user.password
  const actualPassword = checkUser.password
  const isCorrect = await bcrypt.compare(sentPassword, actualPassword)
  if(!isCorrect){
    return res.json({
      status:"fail",
      message:"Password has been changed"
    })
  }
  return res.json({
    status:"success",
    message:"User verified"
  })
}
