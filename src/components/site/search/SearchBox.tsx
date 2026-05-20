"use client";

import { Search } from "lucide-react";
import { useState } from "react";

type Props = {
  onSearch?: (value: string) => void;
};

export default function SearchBox({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch?.(query);

    console.log("search:", query);
  };

  return (
    <div className="container-custom mt-8">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-3xl mx-auto
          bg-white rounded-2xl
          shadow-md border border-gray-100
          flex items-center gap-2
          p-2 md:p-3
          transition-all duration-300
          focus-within:ring-2 focus-within:ring-green-500/20
          focus-within:border-green-500
        "
      >
        <div
          className="
            flex items-center justify-center
            w-11 h-11 rounded-xl
            bg-green-50 text-green-600
            shrink-0
          "
        >
          <Search size={20} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="دنبال چه دوره‌ای می‌گردی؟"
          className="
            flex-1 bg-transparent outline-none
            text-sm md:text-base
            placeholder:text-gray-400
            h-11
          "
        />

        <button
          type="submit"
          className="
            h-11 px-4 md:px-6
            rounded-xl
            bg-green-600 hover:bg-green-700
            text-white text-sm md:text-base
            transition-colors duration-300
            shrink-0
          "
        >
          جستجو
        </button>
      </form>
    </div>
  );
}