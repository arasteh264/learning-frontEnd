import { Clock, GraduationCap, User } from "lucide-react";

export default function IntroCourses() {
  const stats = [
    { icon: Clock, count: 850, label: "ساعت آموزش" },
    { icon: GraduationCap, count: 120, label: "دوره تخصصی" },
    { icon: User, count: 12500, label: "دانشجو" },
  ];

  return (
    <section className="container-custom">
      <div className="flex flex-col items-center rounded-2xl bg-[#242424]">
        <div className="flex items-center gap-2">
          <h1 className="py-4 text-2sm font-bold text-white">
            همه دوره‌های آموزشی
          </h1>
          <div className="h-4 w-1 rounded-ee-md bg-brand text-xl"></div>
        </div>

        <div className="flex">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 px-5 py-5 text-center text-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500 bg-brand/20">
                  <Icon size={17} />
                </div>

                <div className="text-[11px]">
                  +{item.count.toLocaleString("fa-IR")}
                </div>
                <div className="text-[11px]">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}