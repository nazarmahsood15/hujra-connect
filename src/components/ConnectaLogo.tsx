export interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "light" | "gold";
}

export function ConnectaLogo({ className = "", size = "md", variant = "primary" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const bgClasses = {
    primary: "bg-[#0f4c4c] dark:bg-[#17706b] text-[#e8a23d]",
    light: "bg-[#fffbf3] text-[#0f4c4c] border border-[#e4d5b8]",
    gold: "bg-[#e8a23d] text-[#0f4c4c]",
  };

  return (
    <div
      className={`rounded-2xl flex items-center justify-center shadow-md transition-transform ${sizeClasses[size]} ${bgClasses[variant]} ${className}`}
      aria-label="Connecta Logo"
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/5 h-3/5"
      >
        {/* Main Connecta 'C' Arc */}
        <path
          d="M24 10C21.5 7.5 17.8 6 13.5 6C5.5 6 1 12.5 1 18C1 23.5 5.5 30 13.5 30C18 30 21.8 28.2 24.2 25.5"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Connection Nodes */}
        <circle cx="26.5" cy="9.5" r="3.5" fill={variant === "gold" ? "#0f4c4c" : "#e8a23d"} />
        <circle cx="26.5" cy="25.5" r="3.5" fill={variant === "gold" ? "#0f4c4c" : "#e8a23d"} />
        {/* Interconnected Link */}
        <path
          d="M13.5 13.5C11 13.5 9 15.5 9 18C9 20.5 11 22.5 13.5 22.5H20"
          stroke={variant === "gold" ? "#0f4c4c" : "#e8a23d"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
