import {
  Clock,
  Users,
  BarChart3,
  Award,
  PlayCircle,
  BookOpen,
  Signal,
  Infinity as InfinityIcon,
} from "lucide-react";
import type { CourseStat } from "@/src/services/course";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  users: Users,
  level: BarChart3,
  certificate: Award,
  lessons: PlayCircle,
  book: BookOpen,
  signal: Signal,
  access: InfinityIcon,
};

type Props = {
  stats: CourseStat[];
};

export default function StatsGrid({ stats }: Props) {
  if (!stats?.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {stats.map((item) => {
        const Icon = ICON_MAP[item.icon] || BookOpen;

        return (
          <div
            key={item.id}
            className="bg-[#fafafa] rounded-xl p-5 flex flex-col items-center gap-3 transition-colors hover:bg-[#F2F6F3]"
          >
            <div className="size-12 rounded-2xl bg-[#1EB35B]/10 flex items-center justify-center text-[#1EB35B]">
              <Icon className="size-6" />
            </div>

            <div className="flex flex-col items-center gap-0.5">
              <span className="font-bold text-xs text-[#1C2B27]">
                {item.title}
              </span>
              <span className="text-xs text-gray-400">{item.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}