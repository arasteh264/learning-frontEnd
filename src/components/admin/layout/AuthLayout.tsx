import Image from "next/image";
import { ToastContainer } from "react-toastify";

export const AuthLayout: React.FC<LayoutProp> = ({ children }) => {
  return (
<div className="min-h-screen flex flex-col md:flex-row bg-gray-50">

      {/* TOP IMAGE (mobile) / LEFT (desktop) */}
      <div className="relative w-full md:w-1/2 h-48 md:h-auto">
        <img
          src="/images/young-man.webp"
          className="h-full w-full object-cover"
          alt="auth"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* FORM SECTION */}
      <div className="flex flex-1 items-center justify-center px-5 py-10">

        <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
          {children}
        </div>

      </div>

    </div>
  );
};
