"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function StripeProvider({ loading, planType, price }) {
  // Convert price from "$XX" format to cents (multiply by 100)
  const amount = parseInt(price?.replace(/[^0-9.-]+/g, "")) * 100;

  const options = {
    mode: "payment",
    currency: "usd",
    amount, // This will be a number in cents
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#0570de",
        colorBackground: "#ffffff",
        colorText: "#30313d",
        colorDanger: "#df1b41",
        fontFamily: "cairo, system-ui, sans-serif",
        borderRadius: "6px",
      },
    },
    paymentMethodTypes: ["card"],
    paymentMethodCreation: "manual",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeForm loading={loading} planType={planType} />
    </Elements>
  );
}
