import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const forAmountForStripe = (amount) => {
  return Math.round(amount * 100);
}

export async function POST(req) {
  const body = await req.json();
  const { plan } = body; 
  
  let unitAmount;
  let productName;

  if (plan === 'basic') {
    unitAmount = forAmountForStripe(5);
    productName = 'Basic Plan';
  } else if (plan === 'premium') {
    unitAmount = forAmountForStripe(10);
    productName = 'Pro Subscription';
  } else {
    return NextResponse.json({ error: { message: 'Invalid plan type' } }, { status: 400 });
  }

  const params = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
          },
          unit_amount: unitAmount,
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
  };

  try {
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error('Error creating checkout session', error);
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}