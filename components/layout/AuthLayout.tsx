import Image from "next/image";
import { ToastContainer } from "react-toastify";
interface AuthLayoutProps {
  children: React.ReactNode;
}
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
<div className="relative flex flex-col md:flex-row w-full h-screen overflow-hidden">

<div
  className="relative w-full h-full bg-cover bg-center"
  style={{
    backgroundImage: "url('/images/young-man.webp')",
    backgroundPosition: "30% center"
  }}
/>

  <div className="absolute inset-0 backdrop-blur-xs bg-black/10"></div>

  <div className="relative w-full md:w-1/2 h-1/2 md:h-full z-10" />

  <div className="relative w-full md:w-1/2 flex items-center justify-center z-10 right-20">
    {children}
  </div>

</div>
  );
};
