import { ShieldCheck } from "lucide-react";

export default  function TrustNote({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={`flex items-center justify-center gap-1.5 text-gray-400 ${
        compact ? "text-[11px]" : "text-xs"
      }`}
    >
      <ShieldCheck size={compact ? 13 : 14} />
      پرداخت امن از طریق درگاه بانکی معتبر
    </p>
  );
}