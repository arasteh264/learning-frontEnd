"use client";

import { ReactNode, useState } from "react";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";

import { ToastContainer } from "react-toastify";

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () => new QueryClient()
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          direction="rtl"
          locale={faIR}
          theme={{
            token: {
              fontFamily:
                "var(--font-iranyekan), sans-serif",
            },
          }}
        >
          {children}

          <ToastContainer />
        </ConfigProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}