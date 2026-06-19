type SectionHeaderProps = {
  title: string;
  highlight: string;
  action?: React.ReactNode;
};

export default function SectionHeader({
  title,
  highlight,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center  justify-between gap-x-3 gap-y-2 sm:gap-x-7 flex-wrap sm:flex-nowrap py-2 mt-5 mb-2 px-1 text-right">
      <div className="hidden  w-full h-px bg-strong" />

      {action && <div className="shrink-0 mr-auto text-sm">{action}</div>}
      <h2 className="flex items-center gap-x-1 shrink-0 text-t4 sm:text-t3 md:text-t2 font-bold cursor-default ">
        <span className="text-[#1eb35b] ">{highlight}</span>
        <span>{title}</span>
      </h2>
    </div>
  );
}
