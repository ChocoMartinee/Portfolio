import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create and configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY, 
  },
});

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// auto reply email template
const generateAutoReplyTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <h2 style="color: #007BFF;">Hi ${name},</h2>
      <p>You’ve officially made it to my inbox!  I've received your message and I'm already plotting a response. Hang tight, I'll be in touch soon.</p>
      <p>Best regards,<br>Jerson</p>
    </div>
  </div>
`;


// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  const { name, email, message: userMessage } = payload;
  
  const mailOptions = {
    from: "Portfolio Website", 
    to: process.env.EMAIL_ADDRESS, 
    subject: `New Message From, ${name}`, 
    text: message, 
    html: generateEmailTemplate(name, email, userMessage), 
    replyTo: email, 
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return false;
  }
};

// Helper function to send an auto-reply email
async function sendAutoReply(name, email) {
  const autoReplyOptions = {
    from: `"Portfolio Website" <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: "Thanks for reaching out!",
    text: `Hi ${name},\n\nYou’ve officially made it to my inbox! I've received your message and I'm already plotting a response. Hang tight, I'll be in touch soon.\n\nBest regards,\nJerson :D`,
    html: generateAutoReplyTemplate(name),
  };

  try {
    await transporter.sendMail(autoReplyOptions);
    return true;
  } catch (error) {
    console.error("Auto-reply error:", error.message);
    return false;
  }
}


export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Send email
    const emailSuccess = await sendEmail(payload, message);

    // Send auto-reply email
    const autoReplySuccess = await sendAutoReply(name, email);


    //if (emailSuccess && autoReplySuccess)
    if (emailSuccess && autoReplySuccess) {
        return NextResponse.json({
        success: true,
        message: 'Message and email sent successfully!',
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to send message or email.',
    }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
};