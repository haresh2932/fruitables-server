const passport = require('passport');
const Users = require('../model/users.model');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const googleProvider = async (req, res) => {
  try {
    await passport.use(new GoogleStrategy({
      clientID:process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/users/google/callback"
    },
      async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        try {
          let user = await Users.findOne({ googleId: profile.id })
          console.log("user>", user);
          if (!user) {
            user = await Users.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              role: "user"
            })
          }
          console.log("user:::>", user);
          return cb(null, user);
        } catch (error) {
          return cb(error, null);
        }
      }
    ));
    passport.serializeUser(function (user, done) {
      console.log("serializeUser", user);
      done(null, user);
    });

    passport.deserializeUser(async function (data, done) {
      console.log("deserializeUser", data);
      
      try {
          done(null,data);        
      } catch (error) {
        done(error, null);
      }
    });
  } catch (error) {
    console.log(error, null);
  }

}
const facebookProvider = async (req, res) => {
  try {
    await passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/users/facebook/callback"
    },
      async function (accessToken, refreshToken, public_profile, cb) {
        console.log(public_profile);
        try {
          let user = await Users.findOne({ facebookId: public_profile.id })
          console.log("user>", user);
          if (!user) {
            user = await Users.create({
              name: public_profile.displayName,
              // email: public_profile.emails[0].value,
              facebookId: public_profile.id,
              role: "user"
            })
          }
          console.log("user:::>", user);
          return cb(null, user);
        } catch (error) {
          return cb(error, null);
        }
      }
    ));
    passport.serializeUser(function (user, done) {
      console.log("serializeUser", user);

      done(null, user._id);
    });

    passport.deserializeUser(async function (_id, done) {
      console.log("deserializeUser", _id);
      try {
        const user=await Users.findById(_id);
        if (!user){
          done(null, user);
        }
      } catch (error) {
        done(error, null);
      }
    });
  } catch (error) {
    console.log(error, null);
  }

}



module.exports ={googleProvider,facebookProvider}



  



