const User = require("./../models/userModel");
const validate = require("validator");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  if (!req.body) {
    return res.json({
      status: "fail",
      message: "No Body",
    });
  }
  const { name, email, password } = req.body;
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
  const checkUser = await User.find({email})
  console.log(checkUser);  
  if(checkUser.length !== 0){
    return res.json({
        status: 'fail',
        message: "This email is already in use"
    })
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return res.json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};

exports.logIn = async(req, res)=>{
    const {email, password} = req.body
    if(!email){
        return res.json({
            status: "fail",
            message: "You must provide an email"
        })
    }
    if(!password){
        return res.json({
            status:"fail",
            message: "You must enter a valid password"
        })
    }
    if(password.length < 8){
        return res.json({
            status: "fail",
            message: "Password must be at least 8 characters"
        })
    }
    const wantedUser = await User.find({email})
    if(wantedUser.length === 0){
        return res.json({
            status:"fail",
            message: "No user is registered to this email"
        })
    }
    const user = wantedUser[0]
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        return res.json({
            status:"fail",
            message:"Incorrect Password"
        })
    }
    return res.json({
        status:'success',
        data:{
            user
        }
    })
}