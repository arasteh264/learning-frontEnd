import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type BreadcrumbItem = {
  title: string;
  href: string;
};

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({
  items,
  className = "",
}: Props) {
  return (
    <nav
      className={`
        flex flex-row-reverse items-center gap-2 justify-start
        overflow-x-auto  px-2
        text-[11px] text-gray-700
        ${className}
      `}
    >
      {items.map((item, index) => (
        <div
          key={item.href}
          className="flex flex-row-reverse items-center gap-2 shrink-0"
        >
          <Link
            href={item.href}
            className="
              whitespace-nowrap
              hover:text-black
              transition-colors
            "
          >
            {item.title}
          </Link>

          {index !== items.length - 1 && (
            <ChevronLeft
              className="
                size-4
                text-gray-400
                shrink-0
              "
            />
          )}
        </div>
      ))}
    </nav>
  );
}