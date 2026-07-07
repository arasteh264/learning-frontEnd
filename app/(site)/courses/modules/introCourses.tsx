import { Clock, GraduationCap, User } from "lucide-react";

export default function IntroCourses() {
  const stats = [
    {
      icon: Clock,
      count: 850,
      label: "ساعت آموزش",
    },
    {
      icon: GraduationCap,
      count: 120,
      label: "دوره تخصصی",
    },
    {
      icon: User,
      count: 12500,
      label: "دانشجو",
    },
  ];

  return (
    <section className="container-custom">
      <div className="flex flex-col items-center bg-[#242424] rounded-2xl">
        <div className="flex items-center gap-2">
          <h1 className="text-2sm font-bold text-white py-4">
            همه دوره‌های آموزشی
          </h1>
          <div className="bg-brand text-xl w-1 h-4 rounded-ee-md"></div>
        </div>
        <div className="flex">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 px-5 text-center text-white py-5"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand/20 bg-gray-500">
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
