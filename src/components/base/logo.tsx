export default function Logo({ className = "", variant = "default" }) {
  const isReversed = variant === "reversed";

  return (
    <div className={`flex items-center gap-2 ${className}`} dir="rtl">
      <svg width="32" height="32" viewBox="0 0 120 120" aria-hidden="true">
        <rect
          x="4"
          y="4"
          width="112"
          height="112"
          rx="28"
          fill={isReversed ? "#FFFFFF" : "#4338CA"}
        />
        <path
          d="M42 34 L42 84 L60 70 L78 84 L78 34 Z"
          fill={isReversed ? "#312E81" : "#FFFFFF"}
        />
        <circle cx="82" cy="38" r="7" fill="#FBBF24" />
      </svg>
      <span
        className="font-black text-lg leading-none"
        style={{ color: isReversed ? "#FFFFFF" : "#1E1B4B" }}
      >
        یاددادی
      </span>
    </div>
  );
}