import { Check } from "lucide-react";

type Props = {
  title?: string;
  items: string[];
};

export default function PrerequisitesCard({
  title = "پیش نیاز ها",
  items,
}: Props) {
  return (
    <div className="flex flex-col   bg-[#fafafa] mt-5 p-5 sm:p-7 rounded-xl">
      <div className="flex justify-end items-center gap-x-2.5 md:gap-x-3 mb-5 md:mb-7">
        <h2 className="font-bold text-body md:text-t3">{title}</h2>
      </div>

      <div className="flex  flex-col  sm:gap-x-6 gap-y-4 text-label sm:text-caption">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-end items-center gap-x-2 sm:gap-x-2.5"
          >
            <span>{item}</span>
            <div className="bg-green-600 w-5 h-5 flex items-center justify-center rounded-sm">
            <Check className="size-6 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
