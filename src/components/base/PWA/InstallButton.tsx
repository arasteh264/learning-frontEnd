'use client';

import { useInstallPrompt } from "@/src/hooks/useInstallPrompt";


export function InstallButton() {
  const { isInstallable, promptInstall } = useInstallPrompt();

  if (!isInstallable) return null;

  return (
    <button
      onClick={promptInstall}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
    >
      نصب یاددادی 📲
    </button>
  );
}