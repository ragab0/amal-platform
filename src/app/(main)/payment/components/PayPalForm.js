"use client";
import { BsPaypal } from "react-icons/bs";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { useRouter } from "next/navigation";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  createPaypalOrder,
  processPayment,
} from "@/store/features/payment/paymentThunks";

export default function PayPalForm({ loading, planType, price }) {
  const amount = parseInt(price?.replace(/[^0-9.-]+/g, ""));

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  async function createOrder() {
    const { error, payload } = await dispatch(createPaypalOrder({ planType }));
    if (!error && payload?.status === "success") {
      return payload.result.data.orderId;
    }
  }

  const onApprove = async (data, actions) => {
    setIsProcessing(true);
    try {
      console.log("[PayPal Debug] Order approved:", data);
      const orderId = data.orderID;
      const { error: dispatchError, payload } = await dispatch(
        processPayment({
          orderId,
          usedMethod: "paypal",
        })
      );
      if (!dispatchError && payload?.status === "success") {
        const { message } = payload.result;
        toast.success(message);
        router.push("/profile/current-plan");
      }
    } catch (error) {
      console.error("[PayPal Error] Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (err) => {
    console.error("[PayPal Error]", err);
    toast.error("حدث خطأ في PayPal");
  };

  return (
    <FadeInUp>
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center mb-4">
          <BsPaypal className="w-16 h-16 text-[#003087] mx-auto mb-2" />
          <h3 className="text-lg font-medium text-gray-900">
            الدفع باستخدام PayPal
          </h3>
          <p className="text-sm text-gray-500">
            اختر PayPal للدفع بشكل آمن وسريع
          </p>
        </div>

        <div
          className={
            loading || isProcessing ? "opacity-50 pointer-events-none" : ""
          }
        >
          <PayPalButtons
            style={{
              layout: "vertical",
              shape: "rect",
              label: "pay",
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            disabled={loading || isProcessing}
          />
        </div>
        {(loading || isProcessing) && (
          <div className="text-center text-sm text-gray-500">
            جاري معالجة الدفع...
          </div>
        )}
      </div>
    </FadeInUp>
  );
}
