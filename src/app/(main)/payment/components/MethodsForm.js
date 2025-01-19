"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "@/validations/paymentSchema";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { processPayment } from "@/store/features/payment/paymentThunks";
import { AnimatePresence } from "framer-motion";
import { FadeInUp } from "@/components/motion/MotionWrappers";
import { BsPaypal } from "react-icons/bs";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { services } from "@/assets/data/servicesData";
import FormInput from "@/components/formInput/FormInput";

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
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const { loading } = useAppSelector((state) => state.payment);
  const { price, originalPrice, id } =
    services.find((s) => s.to === pathname) || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
  });

  const onSubmit = async (data) => {
    // await dispatch(processPayment({ ...data, method: selectedMethod }));
    console.log(data);
  };

  return (
    <div
      className="payment-methods-form mb-6"
      style={loading ? { opacity: 0.5, pointerEvents: "none" } : {}}
    >
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
            <FadeInUp key="card-form">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                id="myForm"
              >
                <FormInput
                  must={true}
                  label=" رقم البطاقة"
                  name="cardNumber"
                  register={register}
                  error={errors.cardNumber?.message}
                  placeholder="1234 1234 1234 1234"
                />
                <FormInput
                  must={true}
                  label="اسم حامل البطاقة"
                  name="cardName"
                  register={register}
                  error={errors.cardName?.message}
                  placeholder="الاسم كما يظهر على البطاقة"
                />
                <div className="grid sm:grid-cols-2 gap-x-[10%]">
                  <FormInput
                    must={true}
                    label="تاريخ الانتهاء"
                    name="expiryDate"
                    register={register}
                    error={errors.expiryDate?.message}
                    placeholder="MM/YY"
                  />
                  <FormInput
                    must={true}
                    label="رمز الامان"
                    name="cvv"
                    register={register}
                    error={errors.cvv?.message}
                    placeholder="CVV"
                  />
                </div>
              </form>
            </FadeInUp>
          ) : (
            <FadeInUp key="paypal-form">
              <div className="text-center p-8">
                <BsPaypal className="w-16 h-16 mx-auto mb-4 text-[#003087]" />
                <p className="text-lg text-gray-600">
                  سيتم تحويلك إلى PayPal لإتمام عملية الدفع
                </p>
              </div>
            </FadeInUp>
          )}
        </AnimatePresence>
      </div>
      <button
        className="btn-secondary mx-auto block rounded-md !font-normal w-full max-w-[300px] py-6 lg:text-2xl"
        form="myForm"
        disabled={loading}
      >
        {loading ? "جاري الدفع..." : "دفع آمن"}
      </button>

      {/* <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          جميع المعاملات مشفرة وآمنة
        </div>
      </div> */}
    </div>
  );
}
