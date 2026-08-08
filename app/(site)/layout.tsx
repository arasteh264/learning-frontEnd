import Navbar from "@/src/components/site/layout/navbar/Navbar";
import Footer from "@/src/components/site/layout/footer";
import { InstallPromptModal } from "@/src/components/base/PWA/InstallPromptModal";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Navbar />

      {children}

      <Footer />
      <InstallPromptModal />
    </>
  );
}