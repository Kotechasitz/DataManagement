const User = require('../models/user');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.index = async (req, res, next) => {
    try {
        const user = await User.find();

        res.status(200).json({ 
            data: user
        });
    } catch (error) {
        next(error);
    }
  }

exports.profile = (req, res, next) => {
    const { _id, name, email, role } = req.user
  res.status(200).json({
       id: _id.body,
       name: name,
       email: email,
       role: role
      });
}

exports.register = async (req, res, next) => {

    try {
      const { name, email, password } = req.body;

      //validation
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        const error = new Error('Data is invalid');
        error.code = 422;
        error.validation = errors.array();
        throw error
      }

      //exist email
      const existEmail = await User.findOne({email:email});
      if(existEmail){
        const error = new Error('Exist Email');
        error.code = 400;
        throw error
      }
  
      let user = new User();
      user.name = name;
      user.email = email;
      user.password = await user.encryptPassword(password);
  
      await user.save();
  
      res.status(201).json({ message: 'Register Success'});
    } catch (error) {
      next(error);
    }
  }

  exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
  
        //exist user
        const user = await User.findOne({email:email});
        if(!user){
          const error = new Error('User not found');
          error.code = 404;
          throw error
        }

        // check password
        const isValid = await user.decryptPassword(password);
        if(!isValid){
            const error = new Error('Password invalid');
            error.code = 401;
            throw error
        }

        // create token
        const token = await jwt.sign({
            id: user._id,
            role: user.role
        }, 'uubGKDhuEKuvG8DS3V69BNfTqmDgyL9EiVY5Gm8lh9NmuuQk06DHe2gHHeRlkyR',{ expiresIn: '15 days' });
    
        //decode expires_in
        const expires_in = jwt.decode(token)

        res.status(200).json({
            access_token: token,
            expires_in: expires_in.exp,
            token_type: 'Bearer',
            message: 'Login Success'
            });
      } catch (error) {
        next(error);
      }
  }