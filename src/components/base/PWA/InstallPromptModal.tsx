"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { useInstallPrompt } from "@/src/hooks/useInstallPrompt";
import { Button } from "antd";

export function InstallPromptModal() {
  const { isInstallable, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // const wasDismissed = localStorage.getItem("pwa-install-dismissed");
    // if (wasDismissed) {
      setDismissed(true);
    //   return;
    // }

    if (isInstallable) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isInstallable]);
  const handleInstall = async () => {
    await promptInstall();
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  if (!isInstallable || dismissed || !show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center">
      <div className="w-full max-w-sm rounded-t-2xl bg-white p-5 shadow-lg md:rounded-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Download className="h-6 w-6" />
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-gray-900">نصب یاددادی</h3>
              <p className="text-sm text-gray-500">
                نسخه‌ی موبایل رو نصب کن، سریع‌تر و راحت‌تر
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={handleInstall}
            className="flex-1 rounded-xl bg-brand py-2.5 text-white font-medium"
          >
            نصب کن
          </Button>
          <Button
            onClick={handleDismiss}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-gray-600"
          >
            فعلاً نه
          </Button>
        </div>
      </div>
    </div>
  );
}
