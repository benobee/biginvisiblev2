import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Email configuration
const EMAIL_TO = import.meta.env.EMAIL_TO || 'info@biginvisible.com';
const EMAIL_FROM = import.meta.env.EMAIL_FROM || 'Big Invisible <info@biginvisible.com>';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.company) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid email address' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Format the email content
    const emailHtml = formatEmailContent(data);
    
    // Send notification email to team
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `New Contact Form Submission from ${data.name} - ${data.company}`,
      html: emailHtml,
      replyTo: data.email
    });

    if (emailError) {
      console.error('Error sending email:', emailError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email' 
        }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Optionally send confirmation email to user
    if (data.email) {
      const confirmationHtml = formatConfirmationEmail(data);
      
      await resend.emails.send({
        from: EMAIL_FROM,
        to: data.email,
        subject: 'Thank you for contacting Big Invisible',
        html: confirmationHtml
      });
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Form submitted successfully',
        emailId: emailData?.id
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error' 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};

// Format the main notification email
function formatEmailContent(data: any): string {
  const recommendations = getRecommendations(data);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #4080ff; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #666; }
        .field-value { margin-top: 5px; }
        .recommendations { background: #f0f8ff; padding: 20px; border-radius: 8px; }
        .list-item { margin-left: 20px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>A new questionnaire has been submitted through the Big Invisible website.</p>
        </div>

        <div class="section">
          <h2>Contact Information</h2>
          <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${data.name}</div>
          </div>
          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">${data.email}</div>
          </div>
          <div class="field">
            <div class="field-label">Company:</div>
            <div class="field-value">${data.company}</div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value">${data.phone}</div>
          </div>
          ` : ''}
        </div>

        <div class="section">
          <h2>Business Information</h2>
          <div class="field">
            <div class="field-label">Business Stage:</div>
            <div class="field-value">${formatValue(data.businessStage)}</div>
          </div>
          <div class="field">
            <div class="field-label">Company Size:</div>
            <div class="field-value">${formatValue(data.companySize)}</div>
          </div>
          <div class="field">
            <div class="field-label">Industry:</div>
            <div class="field-value">${formatValue(data.industry)}</div>
          </div>
        </div>

        <div class="section">
          <h2>Brand & Goals</h2>
          <div class="field">
            <div class="field-label">Current Challenges:</div>
            <div class="field-value">
              ${data.currentChallenges?.length > 0 
                ? data.currentChallenges.map((c: string) => `<div class="list-item">• ${formatValue(c)}</div>`).join('')
                : 'None specified'}
            </div>
          </div>
          <div class="field">
            <div class="field-label">Brand Maturity:</div>
            <div class="field-value">${formatValue(data.brandMaturity)}</div>
          </div>
          <div class="field">
            <div class="field-label">Digital Presence:</div>
            <div class="field-value">${formatValue(data.digitalPresence)}</div>
          </div>
          <div class="field">
            <div class="field-label">Community Goals:</div>
            <div class="field-value">${formatValue(data.communityGoals)}</div>
          </div>
          <div class="field">
            <div class="field-label">Primary Goals:</div>
            <div class="field-value">
              ${data.primaryGoals?.length > 0 
                ? data.primaryGoals.map((g: string) => `<div class="list-item">• ${formatValue(g)}</div>`).join('')
                : 'None specified'}
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Project Details</h2>
          <div class="field">
            <div class="field-label">Timeline:</div>
            <div class="field-value">${formatValue(data.projectTimeline)}</div>
          </div>
          <div class="field">
            <div class="field-label">Budget:</div>
            <div class="field-value">${formatBudget(data.budget)}</div>
          </div>
          ${data.additionalInfo ? `
          <div class="field">
            <div class="field-label">Additional Information:</div>
            <div class="field-value">${data.additionalInfo}</div>
          </div>
          ` : ''}
        </div>

        <div class="recommendations">
          <h2>Recommended Approach</h2>
          <div class="field">
            <div class="field-label">Suggested Services:</div>
            <div class="field-value">
              ${recommendations.services.map((s: string) => `<div class="list-item">• ${s}</div>`).join('')}
            </div>
          </div>
          <div class="field">
            <div class="field-label">Package Tier:</div>
            <div class="field-value">${recommendations.packageTier}</div>
          </div>
        </div>

        <div class="footer">
          <p>This form was submitted on ${new Date().toLocaleString()}</p>
          <p>Please respond within 24 hours as promised.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Format confirmation email for the user
function formatConfirmationEmail(data: any): string {
  const recommendations = getRecommendations(data);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 30px 0; }
        .content { margin: 30px 0; }
        .recommendations { background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .cta { text-align: center; margin: 30px 0; }
        .button { display: inline-block; padding: 12px 30px; background: #4080ff; color: white; text-decoration: none; border-radius: 5px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Contacting Big Invisible</h1>
        </div>

        <div class="content">
          <p>Hi ${data.name},</p>
          
          <p>Thank you for taking the time to complete our brand questionnaire. We've received your submission and are excited to learn more about ${data.company}.</p>
          
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>Our team will review your responses within the next 24 hours</li>
            <li>We'll prepare a customized proposal based on your specific needs</li>
            <li>You'll receive a detailed recommendation with pricing options</li>
            <li>We'll schedule a complimentary 30-minute strategy call to discuss your project</li>
          </ul>

          <div class="recommendations">
            <h3>Based on your responses, here's our initial recommendation:</h3>
            <p><strong>Recommended Services:</strong></p>
            <ul>
              ${recommendations.services.map((s: string) => `<li>${s}</li>`).join('')}
            </ul>
            <p><strong>Suggested Package:</strong> ${recommendations.packageTier}</p>
          </div>

          <p>In the meantime, feel free to explore our work and learn more about our approach:</p>
          
          <div class="cta">
            <a href="https://biginvisible.com/work" class="button">View Our Work</a>
          </div>

          <p>If you have any immediate questions, don't hesitate to reach out directly at info@biginvisible.com.</p>
          
          <p>We look forward to helping you transform your brand!</p>
          
          <p>Best regards,<br>
          The Big Invisible Team</p>
        </div>

        <div class="footer">
          <p>Big Invisible - Brand Architecture Studio</p>
          <p>Based in the Pacific Northwest | Serving clients worldwide</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Helper function to format field values
function formatValue(value: string): string {
  if (!value) return 'Not specified';
  
  // Convert hyphenated values to readable format
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to format budget
function formatBudget(budget: string): string {
  const budgetMap: { [key: string]: string } = {
    'low': '$5,000 - $10,000',
    'medium': '$10,000 - $25,000',
    'high': '$25,000+',
    'discuss': 'To be discussed'
  };
  
  return budgetMap[budget] || 'Not specified';
}

// Get recommendations based on form data
function getRecommendations(data: any) {
  const services = [];
  let packageTier = 'Starter';

  // Analyze responses to determine recommendations
  if (data.primaryGoals?.includes('brand-strategy') || data.brandMaturity === 'early') {
    services.push('Brand Strategy');
  }
  if (data.primaryGoals?.includes('visual-identity') || data.brandMaturity === 'needs-refresh') {
    services.push('Visual Identity');
  }
  if (data.digitalPresence === 'basic' || data.digitalPresence === 'none' || data.primaryGoals?.includes('digital-experience')) {
    services.push('Digital Experience');
  }
  if (data.communityGoals === 'build' || data.primaryGoals?.includes('community-building')) {
    services.push('Community Building');
  }
  if (data.primaryGoals?.includes('content-strategy')) {
    services.push('Content Strategy');
  }
  if (data.primaryGoals?.includes('brand-architecture')) {
    services.push('Brand Architecture');
  }

  // Determine package tier based on company size and budget
  if (data.companySize === 'enterprise' || data.budget === 'high') {
    packageTier = 'Enterprise';
  } else if (data.companySize === 'medium' || data.companySize === 'large' || data.budget === 'medium') {
    packageTier = 'Growth';
  }

  // Default services if none selected
  if (services.length === 0) {
    services.push('Brand Strategy', 'Visual Identity');
  }

  return { services, packageTier };
}
