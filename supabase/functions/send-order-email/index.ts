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
    const { cartItems, userEmail, userProfile } = await req.json();

    // Validate cart items and user ID
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error('Invalid cart items');
    }

    const userId = cartItems[0]?.user_id;
    if (!userId) {
      throw new Error('Invalid user ID');
    }

    // Load environment variables
    const emailUser = Deno.env.get('EMAIL_USER');
    const emailPass = Deno.env.get('EMAIL_PASS');
    const ownerEmail = Deno.env.get('OWNER_EMAIL');

    // Verify credentials are available
    if (!emailUser || !emailPass || !ownerEmail) {
      console.error('Missing environment variables:', {
        hasEmailUser: !!emailUser,
        hasEmailPass: !!emailPass,
        hasOwnerEmail: !!ownerEmail
      });
      throw new Error('Email configuration is missing. Please check environment variables.');
    }

    // Create email transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Calculate total
    const total = cartItems.reduce((sum: number, item: any) => 
      sum + (item.product.price * item.quantity), 0
    );

    // Create email content with user details
    const emailContent = `
      <h2>New Order Received</h2>
      <h3>Customer Details:</h3>
      <p>Name: ${userProfile?.full_name || 'Not provided'}</p>
      <p>Email: ${userEmail}</p>
      <p>Phone: ${userProfile?.phone || 'Not provided'}</p>
      <p>Shipping Address:</p>
      <p>${userProfile?.address || 'Not provided'}</p>
      <p>${userProfile?.city || ''}, ${userProfile?.state || ''} ${userProfile?.zipCode || ''}</p>
      
      <h3>Order Details:</h3>
      <ul>
        ${cartItems.map((item: any) => `
          <li>
            ${item.product.name} - Quantity: ${item.quantity} - Price: ₹${item.product.price * item.quantity}
          </li>
        `).join('')}
      </ul>
      <p><strong>Total: ₹${total.toFixed(2)}</strong></p>
    `;

    // Send email
    await transporter.sendMail({
      from: emailUser,
      to: ownerEmail,
      subject: "New Order Received",
      html: emailContent,
    });

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Clear cart after successful order
    const { error: deleteError } = await supabaseClient
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (deleteError) throw deleteError;

    return new Response(
      JSON.stringify({ message: 'Order processed successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error processing order:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'If you are seeing this error, please ensure all environment variables are set correctly in the Supabase Edge Function settings.'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});