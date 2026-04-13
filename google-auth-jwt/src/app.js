import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { config } from 'dotenv'
config()

const app = express()
app.use(morgan("dev"))
app.use(passport.initialize());


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},(_, __, profile, done)=>{
  return done(null, profile);
}))


// Route to initiate Google OAuth flow
app.get("/auth/google",
  passport.authenticate('google', {scope: ['profile', 'email']})
)

// Callback route that Google will redirect to after authentication
app.get("/auth/google/callback",
  passport.authenticate('google',{
    session: false
  }),
  (req, res)=>{
    console.log(req.user)
    res.send("google uthentication successfull")
})

export default app