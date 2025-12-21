'use server'

import { Resend } from 'resend';

// Initialize Resend with API key
// Make sure to add RESEND_API_KEY to your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  size: string;
  currentERP: string;
  message: string;
};

export async function submitContactForm(data: ContactFormData) {
  try {
    // If no API key is present, log to console for development
    if (!process.env.RESEND_API_KEY) {
      console.log('----------------------------------------');
      console.log('📧 EMAIL SIMULATION (No API Key found)');
      console.log('To: sumanth@isuitesolutions.com');
      console.log('Data:', JSON.stringify(data, null, 2));
      console.log('----------------------------------------');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Email simulated (check console)' };
    }

    await resend.emails.send({
      from: 'iSuite Contact Form <onboarding@resend.dev>', // You need to verify a domain in Resend to change this
      to: ['sumanth@isuitesolutions.com'],
      subject: `New Demo Request: ${data.company}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000;">New Demo Request</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Industry:</strong> ${data.industry}</p>
            <p><strong>Size:</strong> ${data.size}</p>
            <p><strong>Current ERP:</strong> ${data.currentERP || 'None'}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send email. Please try again.' };
  }
}
