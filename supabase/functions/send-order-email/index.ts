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
    const { cartItems, userEmail } = await req.json();

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
      service: 'gmail',  // Using 'gmail' service instead of manual host/port
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Calculate total
    const total = cartItems.reduce((sum: number, item: any) => 
      sum + (item.product.price * item.quantity), 0
    );

    // Create email content
    const emailContent = `
      <h2>New Order Received</h2>
      <p>Order from: ${userEmail}</p>
      <h3>Order Details:</h3>
      <ul>
        ${cartItems.map((item: any) => `
          <li>
            ${item.product.name} - Quantity: ${item.quantity} - Price: ₹${item.product.price * item.quantity}
          </li>
        `).join('')}
      </ul>
      <p>Total: ₹${total.toFixed(2)}</p>
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