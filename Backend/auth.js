const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('./config/db'); 
const dotenv = require('dotenv');
const app = express();
dotenv.config();


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// JWT Token Oluşturma


const generateToken = (user) => {
  const token = jwt.sign({ userId: user.User_Id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token süresi (örneğin 1 saat)
  });
  return token
};

// JWT Token Doğrulama
const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null; 
  }
};
const authMiddleware = (req, res, next) => {
  const token = req.headers && req.headers.authorization;

  if (!token) {
    return res && res.status(401).json({ message: 'Token not provided' });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res && res.status(401).json({ message: 'Invalid token' });
  }

 
  req.userId = decodedToken.userId;
  next();
};


app.post('/login', authMiddleware, async (req, res) => {
  const { UserName, Passwords } = req.body;

  try {
    const user = await User.findOne({
      where: {
        UserName
      }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(Passwords, user.Passwords);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

   
    const token = generateToken(user);

    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


module.exports = authMiddleware;
