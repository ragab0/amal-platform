"use client";
import { useState } from "react";
import { useAppSelector } from "@/hooks/ReduxHooks";
import { AnimatePresence } from "framer-motion";
import { BsPaypal } from "react-icons/bs";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { services } from "@/assets/data/servicesData";
import StripeProvider from "./StripeProvider";
import PayPalForm from "./PayPalForm";
import PayPalProvider from "./PayPalProvider";

const paymentMethods = [
  {
    id: "paypal",
    name: "PayPal",
    icon: <BsPaypal className="w-8 h-8" />,
  },
  {
    id: "card",
    name: "بطاقة ائتمان",
    icon: <FaCcVisa className="w-8 h-8" />,
    iconAlt: <FaCcMastercard className="w-8 h-8" />,
  },
];

export default function MethodsForm() {
  const pathname = usePathname();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const { loading } = useAppSelector((state) => state.payment);
  const {
    price,
    originalPrice,
    id: planType,
  } = services.find((s) => s.to === pathname) || {};

  return (
    <div className="payment-methods-form mb-6">
      <div className="bg-white mt-[80px] mb-[100px] rounded-lg border shadow-[0px_3px_6px_#00000029] py-[2%] px-[4%] pb-[6%]">
        <div className="flex max-md:flex-col gap-y-4 justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <h4 className="text-[50px] font-medium text-main">{price}</h4>
            <span className="text-[40px] text-gray-400 line-through">
              {originalPrice}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <button
                type="button"
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center justify-center gap-4 p-4 rounded-lg border-2 transition-colors ${
                  selectedMethod === method.id
                    ? "border-main bg-main/5"
                    : "border-gray-200 hover:border-main/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {method.icon}
                  {method.iconAlt}
                </div>
                <span className="text-lg">{method.name}</span>
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {selectedMethod === "card" ? (
            <StripeProvider
              loading={loading}
              price={price}
              planType={planType}
            />
          ) : (
            <PayPalProvider
              loading={loading}
              price={price}
              planType={planType}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
