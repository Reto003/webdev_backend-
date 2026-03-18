import { text } from 'express';
import  userModel from '../models/user.model.js';
import { sendVerificationEmail } from '../services/mail.service.js';

export const register = async (req, res) => { 

  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [
      { email },
      { username }
    ]
  })
  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: 'User already exists',
      sucess: false,
      err: "user with this email or username already exists"
    })
  }

  const user = await userModel.create({
    username,
    email,
    password
  })

  await sendVerificationEmail({
    to: user.email,
    subject: 'welcome to perplexityAi, please verify your email',
    text: `Hi ${user.username},\n\nThank you for registering at perplexityAi! Please verify your email address by clicking the link below:\n\nhttp://localhost:3000/verify-email?email=${user.email}\n\nBest regards,\nThe perplexityAi Team`,
    html: `
      <p>Hi ${user.username},</p>
      <p>Thank you for registering at perplexityAi! Please verify your email address by clicking the link below:</p>
      <a href="http://localhost:3000/verify-email?email=${user.email}">Verify Email</a>
      <p>Best regards,<br>The perplexityAi Team</p>
    `
  })

  return res.status(201).json({
    message: 'User registered successfully',
    user: { 
      username: user.username,
      email: user.email, 
      verified: user.verified 
    }
  })
}