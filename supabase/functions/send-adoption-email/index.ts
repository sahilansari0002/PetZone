import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import nodemailer from "npm:nodemailer@6.9.12";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { applicationData, userEmail, petDetails } = await req.json();

    // Load environment variables
    const emailUser = Deno.env.get('EMAIL_USER');
    const emailPass = Deno.env.get('EMAIL_PASS');
    const ownerEmail = Deno.env.get('OWNER_EMAIL');

    if (!emailUser || !emailPass || !ownerEmail) {
      throw new Error('Email configuration is missing');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Create email content
    const emailContent = `
      <h2>New Adoption Application Received</h2>
      
      <h3>Pet Details:</h3>
      <p>Name: ${petDetails.name}</p>
      <p>Species: ${petDetails.species}</p>
      <p>Breed: ${petDetails.breed}</p>
      
      <h3>Applicant Information:</h3>
      <p>Name: ${applicationData.personal_info.firstName} ${applicationData.personal_info.lastName}</p>
      <p>Email: ${applicationData.personal_info.email}</p>
      <p>Phone: ${applicationData.personal_info.phone}</p>
      <p>Address: ${applicationData.personal_info.address}, ${applicationData.personal_info.city}, ${applicationData.personal_info.state} ${applicationData.personal_info.zipCode}</p>
      
      <h3>Home Information:</h3>
      <p>Housing Type: ${applicationData.home_info.housing}</p>
      <p>Own/Rent: ${applicationData.home_info.ownRent}</p>
      <p>Has Yard: ${applicationData.home_info.hasYard ? 'Yes' : 'No'}</p>
      <p>Has Children: ${applicationData.home_info.hasChildren ? 'Yes' : 'No'}</p>
      
      <h3>Experience:</h3>
      <p>Previous Pet Experience: ${applicationData.experience.petExperience}</p>
      <p>Hours Pet Will Be Alone: ${applicationData.experience.hoursAlone}</p>
      <p>Exercise Plan: ${applicationData.experience.exercisePlan}</p>
      
      <h3>References:</h3>
      <p>Name: ${applicationData.reference_info.refName}</p>
      <p>Phone: ${applicationData.reference_info.refPhone}</p>
      <p>Relationship: ${applicationData.reference_info.refRelationship}</p>
    `;

    // Send email
    await transporter.sendMail({
      from: emailUser,
      to: ownerEmail,
      subject: `New Adoption Application - ${petDetails.name}`,
      html: emailContent,
    });

    return new Response(
      JSON.stringify({ message: 'Application submitted successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error processing adoption application:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});