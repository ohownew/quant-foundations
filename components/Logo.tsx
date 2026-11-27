export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="4" fill="#161714" />
      <path d="M8 46C16 40 20 28 28 24C36 20 42 30 48 22C52 16.7 54 14 56 12" stroke="#E8E0D1" strokeWidth="2.2" fill="none" />
      <circle cx="48" cy="22" r="2.3" fill="#9C2F2F" />
      <path d="M8 50H56" stroke="#8A6A32" strokeWidth="1.2" />
    </svg>
  );
}
