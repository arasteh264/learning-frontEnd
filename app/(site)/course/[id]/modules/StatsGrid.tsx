export default function StatsGrid({ stats }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {stats.map((item: any) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="
               bg-[#fafafa]
                
                rounded-xl
                p-5
                flex
                flex-col
                items-center
                gap-4
              "
          >
            <div
              className="
                  size-12
                  rounded-2xl
                  bg-[#1eb35b]/10
                  flex
                  items-center
                  justify-center
                  text-[#1eb35b]
                "
            >
              <Icon className="size-6" />
            </div>

            <div className="flex flex-col items-center">
              <span className="font-bold text-xs">{item.title}</span>

              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}