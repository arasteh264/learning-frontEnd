"use client";


import { Suspense } from "react";
import PaymentFailedContent from "../failed/Paymentfailedcontent";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <section className="container-custom mt-20 flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse" />
        <div className="h-6 w-40 bg-gray-100 rounded animate-pulse" />
      </section>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}
 