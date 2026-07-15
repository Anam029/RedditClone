import { User } from "../models/user.models.js"; 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export async function register(req, res){
    try {
        
    
    const{username,password,email} = req.body;
    console.log(req.body)

    if(!username || !password || !email){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const isAlreadyRegistered = await User.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if(isAlreadyRegistered){
        return res.status(409).json({
            message: "Username or email already exist"
        })
    }
    
    const hashPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        username,
        email,
        password: hashPassword
    })
    return res.status(201).json({
        message: "User created successfully"
    })
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    

    

    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const refreshToken = jwt.sign(
  {
    id: user._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  }
)
res.cookie("refreshToken",refreshToken,{
    httpOnly: true,
    secure: true
})


return res.status(200).json({
      message: "Login successful",
      accessToken,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function logout(req,res){
  
}
