import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalForm from "./PayPalForm";

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

export default function PayPalProvider({ loading, planType, price }) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalForm loading={loading} planType={planType} price={price} />
    </PayPalScriptProvider>
  );
}
