import { PackageX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  message?: string;
  icon?: LucideIcon;
};

export default function EmptyState({
  message = "موردی یافت نشد",
  icon: Icon = PackageX,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
      <Icon size={48} strokeWidth={1.2} />
      <p className="text-sm">{message}</p>
    </div>
  );
}