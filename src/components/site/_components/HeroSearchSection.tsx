"use client";

type HeroSearchSectionProps = {
  title?: string;
  description?: string;
};

export default function HeroSearchSection({}: HeroSearchSectionProps) {
  return (
    <section className="container-custom w-full px-4 md:px-6 pt-6 md:pt-10">
      <div className="flex flex-col md:text-center items-end">
        <div className="w-full text-right leading-relaxed sm:justify-center items-center gap-2 flex flex-row-reverse text-2xl md:text-2xl font-extrabold sm:px-0">
          <span className="float-right relative inline-flex items-center justify-center px-2 py-2 sm:px-3 h-14 bg-brand-light border border-border ml-2">
            <span className="text-brand font-extrabold whitespace-nowrap">
       آموزش و یادگیری
            </span>
            <div className="absolute -top-[3px] -right-[3px] size-1.5 bg-border rounded-md" />
            <div className="absolute -top-[3px] -left-[3px] size-1.5 bg-border rounded-md" />
            <div className="absolute -bottom-[3px] -right-[3px] size-1.5 bg-border rounded-md" />
            <div className="absolute -bottom-[3px] -left-[3px] size-1.5 bg-border rounded-md" />
          </span>
          <span className="whitespace-nowrap">رو همین امروز </span>
        </div>
        <h2 className="w-full text-2xl whitespace-nowrap font-extrabold">
          !شروع کن ومسیر شغلی ات رو‌‌ بساز
        </h2>
      </div>
    </section>
  );
}