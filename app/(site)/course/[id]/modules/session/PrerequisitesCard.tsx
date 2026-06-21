import { Check } from "lucide-react";

type Props = {
  title?: string;
  items: string[];
};

export default function PrerequisitesCard({
  title = "پیش‌نیازها",
  items,
}: Props) {
  if (!items?.length) return null;

  return (
    <div className="flex flex-col bg-[#fafafa] mt-5 p-5 sm:p-7 rounded-xl">
      <div className="flex justify-end items-center gap-2.5 mb-5">
        <h2 className="font-bold text-[#1C2B27]">{title}</h2>
      </div>

      <div className="flex flex-wrap justify-end gap-2.5">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white border border-gray-100 rounded-full pl-3 pr-2 py-1.5"
          >
            <span className="text-xs text-[#1C2B27]">{item}</span>
            <div className="bg-[#1EB35B] w-5 h-5 flex items-center justify-center rounded-full shrink-0">
              <Check className="size-3 text-white" strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}