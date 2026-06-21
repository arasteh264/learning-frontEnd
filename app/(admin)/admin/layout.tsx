import HeaderDashborad from "@/src/components/admin/layout/Header";
import Sidebar from "@/src/components/admin/layout/Sidebar";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";
import { ToastContainer } from "react-toastify";

export default function AdminLayout({ children }: LayoutProp) {
  return (
    <ConfigProvider
      direction="rtl"
      locale={faIR}
      theme={{
        token: {
          fontFamily: "var(--font-iranyekan), sans-serif",
        },
      }}
    >
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderDashborad />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#FBF8F2]">
            {children}
          </main>
        </div>

        <Sidebar />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ConfigProvider>
  );
}
