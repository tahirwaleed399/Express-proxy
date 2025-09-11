const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://sea-turtle-app-t5abj.ondigitalocean.app',
    "https://ek.com.sa/"
  ],
  credentials: true
}));

app.use(express.json());

// Email transporter configuration
// const createEmailTransporter = () => {
//   return nodemailer.createTransport({
//     service: 'gmail', // or your preferred email service
//     auth: {
//       user: process.env.EMAIL_USER, // your email
//       pass: process.env.EMAIL_APP_PASSWORD // your app password
//     }
//   });
// };

const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: "webmail.ek.com.sa",   // you can switch to smtp2 if needed
   port: 587,
secure: false,
           // TLS starts automatically on 587
    auth: {
      user: "info@ek.com.sa",  // your email
      pass: "Emdad@$2030",     // password they gave you
    },
  });
};

// Email template
const createEmailTemplate = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .header { background: #6845af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #6845af; }
            .value { background: white; padding: 10px; border-radius: 4px; margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #6845af; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
                <p>You have received a new message from your website</p>
            </div>
            
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.name || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">${formData.email || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${formData.phone || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Contact Purpose:</div>
                <div class="value">${formData.contactPurpose || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${formData.message || 'No message provided'}</div>
            </div>
            
            <div class="footer">
                <p>This email was sent from your website contact form on ${new Date().toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Email template for detailed services
const createDetailedServicesEmailTemplate = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Detailed Services Request</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .header { background: #6845af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #6845af; }
            .value { background: white; padding: 10px; border-radius: 4px; margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #6845af; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .service-badge { background: #6845af; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Detailed Services Request</h2>
                <p>You have received a new service inquiry from your website</p>
            </div>
            
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.name || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">${formData.email || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${formData.phone || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Organization:</div>
                <div class="value">${formData.organization || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Service Type:</div>
                <div class="value">
                  ${formData.service ? `<span class="service-badge">${formData.service}</span>` : 'Not provided'}
                </div>
            </div>
            
            <div class="field">
                <div class="label">Service Request:</div>
                <div class="value">
                  ${formData.serviceRequest ? `<span class="service-badge">${formData.serviceRequest}</span>` : 'Not provided'}
                </div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${formData.message || 'No message provided'}</div>
            </div>
            
            <div class="footer">
                <p>This email was sent from your detailed services form on ${new Date().toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Email template for supplier form
const createSupplierEmailTemplate = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Supplier Registration</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
            .header { background: #6845af; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #6845af; }
            .value { background: white; padding: 10px; border-radius: 4px; margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #6845af; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .business-badge { background: #6845af; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Supplier Registration</h2>
                <p>You have received a new supplier inquiry from your website</p>
            </div>
            
            <div class="field">
                <div class="label">Supplier Name:</div>
                <div class="value">${formData.supplierName || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Supplier Email:</div>
                <div class="value">${formData.supplierEmail || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${formData.supplierPhone || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Company Name:</div>
                <div class="value">${formData.companyName || 'Not provided'}</div>
            </div>
            
            <div class="field">
                <div class="label">Business Type:</div>
                <div class="value">
                  ${formData.businessType ? `<span class="business-badge">${formData.businessType}</span>` : 'Not provided'}
                </div>
            </div>
            
            <div class="field">
                <div class="label">Contact Purpose:</div>
                <div class="value">
                  ${formData.contactPurpose ? `<span class="business-badge">${formData.contactPurpose}</span>` : 'Not provided'}
                </div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${formData.supplierMessage || 'No message provided'}</div>
            </div>
            
            <div class="footer">
                <p>This email was sent from your supplier registration form on ${new Date().toLocaleString()}</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Contact form submission route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, contactPurpose, message, recaptchaToken } = req.body;

    console.log('Contact form submission received');

    // Basic validation
    const requiredFields = { name, email, phone, contactPurpose, message };
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || !value.trim())
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missingFields
      });
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Prepare form data
    const formData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      contactPurpose: contactPurpose.trim(),
      message: message.trim()
    };

    console.log('Sending contact form email...');

    // Create email transporter
    const transporter = createEmailTransporter();

    // Email options
    const mailOptions = {
      from: "info@ek.com.sa",
      to: 'tahirwaleed399@gmail.com',
      subject: `New Contact Form Submission - ${formData.contactPurpose}`,
      html: createEmailTemplate(formData),
      replyTo: formData.email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Contact form email sent successfully');

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
});

// Detailed services form submission route
app.post('/api/detailed-services', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      organization, 
      service, 
      serviceRequest, 
      message, 
      recaptchaToken 
    } = req.body;

    console.log('Detailed services form submission received');

    // Basic validation
    const requiredFields = { name, email, phone, organization, message };
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || !value.trim())
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missingFields
      });
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Prepare form data
    const formData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      organization: organization.trim(),
      service: service ? service.trim() : '',
      serviceRequest: serviceRequest ? serviceRequest.trim() : '',
      message: message.trim()
    };

    console.log('Sending detailed services email...');

    // Create email transporter
    const transporter = createEmailTransporter();

    // Email options
    const mailOptions = {
      from: "info@ek.com.sa",
      to: 'tahirwaleed399@gmail.com',
      subject: `New Detailed Services Request - ${formData.organization} (${formData.serviceRequest || 'General Inquiry'})`,
      html: createDetailedServicesEmailTemplate(formData),
      replyTo: formData.email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Detailed services email sent successfully');

    res.status(200).json({
      success: true,
      message: 'Detailed services request submitted successfully'
    });

  } catch (error) {
    console.error('Detailed services form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send detailed services request. Please try again later.'
    });
  }
});

// Supplier form submission route
app.post('/api/supplier', async (req, res) => {
  try {
    const { 
      supplierName, 
      supplierEmail, 
      supplierPhone, 
      companyName, 
      businessType, 
      contactPurpose, 
      supplierMessage, 
      recaptchaToken 
    } = req.body;

    console.log('Supplier form submission received');

    // Basic validation
    const requiredFields = { supplierName, supplierEmail, supplierPhone, companyName, businessType, contactPurpose, supplierMessage };
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || !value.trim())
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missingFields
      });
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(supplierEmail)) {
      console.log('Invalid email format:', supplierEmail);
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Prepare form data
    const formData = {
      supplierName: supplierName.trim(),
      supplierEmail: supplierEmail.trim(),
      supplierPhone: supplierPhone.trim(),
      companyName: companyName.trim(),
      businessType: businessType.trim(),
      contactPurpose: contactPurpose.trim(),
      supplierMessage: supplierMessage.trim()
    };

    console.log('Sending supplier email...');

    // Create email transporter
    const transporter = createEmailTransporter();

    // Email options
    const mailOptions = {
      from: "info@ek.com.sa",
      to: 'tahirwaleed399@gmail.com',
      subject: `New Supplier Registration - ${formData.companyName} (${formData.contactPurpose})`,
      html: createSupplierEmailTemplate(formData),
      replyTo: formData.supplierEmail
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Supplier email sent successfully');

    res.status(200).json({
      success: true,
      message: 'Supplier registration submitted successfully'
    });

  } catch (error) {
    console.error('Supplier form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send supplier registration. Please try again later.'
    });
  }
});

// Existing routes
app.get('/api/jobs', async (req, res) => {
  try {
    const response = await fetch(
      'https://integration-emdad.kayanhr.com/api/v1/TalentAcquisitions/GetPublishedJobPost',
      {
        method: 'GET',
        headers: {
          'accept': 'text/plain',
          'clientID': 'uLpfmDP8TrKlTv',
          'ClientSecret': 'P5rrEFZgDt4/5i3Jnh/BpgNuZc4bvqFjld7PYmvSQ5A='
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch data from external API' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Express Proxy Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});