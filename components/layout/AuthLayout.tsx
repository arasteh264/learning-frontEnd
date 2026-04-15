import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
interface AuthLayoutProps {
  children: React.ReactNode;
}
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex items-center gap-5 bg-gray-100 p-4">
       <Image
        src="/images/young-man.webp" 
        alt="توضیح تصویر"
        width={500} 
        height={300} 
        className='hidden sm:flex'
      />
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        {children}
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
    </div>
  );
};