import { BookOpen, PlayCircle, GraduationCap } from "lucide-react";

export default function LoadingPage() {
return ( <div className="h-[70vh] flex items-center justify-center"> <div className="relative"> <div className="absolute inset-0 blur-3xl bg-blue-500/20 animate-pulse rounded-full" />
    <div className="relative flex gap-8 items-center">
      <BookOpen
        size={48}
        className="text-blue-500 animate-bounce"
      />

      <div className="relative">
        <GraduationCap
          size={72}
          className="text-indigo-600 animate-pulse"
        />

        <div className="absolute -inset-6 border-4 border-indigo-200 rounded-full animate-spin" />
      </div>

      <PlayCircle
        size={48}
        className="text-violet-500 animate-bounce"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  </div>
</div>


);
}
