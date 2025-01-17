import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'


//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" })
    }

    const token = createToken(user._id)
    res.json({ success: true, token })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const createToken = () => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}



//register user
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  try {
    //checking is user already exists
    const exists = await User.findOne({ email })
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" })
    }

    //validation email format and Strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter strong password" })
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      confirmpassword: confirmPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({ success: true, token })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

export { loginUser, registerUser }