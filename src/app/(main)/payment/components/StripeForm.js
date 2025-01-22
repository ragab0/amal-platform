"use client";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { processPayment } from "@/store/features/payment/paymentThunks";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function StripeForm({ loading, planType }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!stripe || !elements || isProcessing) {
      return;
    }
    setIsProcessing(true);
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        console.error("[submit error]", submitError);
        return;
      }
      // create the payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        elements,
      });
      if (error) {
        console.error("[error]", error);
        return;
      }
      const { error: dispatchError, payload } = await dispatch(
        processPayment({
          paymentMethodId: paymentMethod.id,
          planType,
          usedMethod: "stripe",
        })
      );
      if (!dispatchError && payload?.status === "success") {
        const { message, data } = payload.result;
        toast.success(message);
        router.push("/profile/current-plan");
      }
    } catch (error) {
      console.error("[payment error]", error);
    } finally {
      setIsProcessing(false);
    }
  }

  const isDisabled = loading || !stripe || !isValid || isProcessing;

  return (
    <FadeInUp>
      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement
          onChange={(event) => {
            setIsValid(event.complete);
          }}
          options={{
            layout: "tabs",
            defaultValues: {
              billingDetails: {
                name: "",
                email: "",
              },
            },
          }}
        />
        <button
          className={`btn-primary mx-auto block rounded-md !font-normal w-full ${
            isDisabled && "opacity-50 cursor-not-allowed"
          }`}
          disabled={isDisabled}
          type="submit"
        >
          {isProcessing || loading ? "جاري الدفع..." : "دفع آمن"}
        </button>
      </form>
    </FadeInUp>
  );
}
