type ClipButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function ClipButton({
  children,
  className = "",
}: ClipButtonProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 230 58"
        preserveAspectRatio="none"
      >
        <path
          d="
            M14,0
            L216,0
            Q230,0 230,14
            L230,28
            Q230,31 228,36
            L214,52
            Q208,58 200,58
            L14,58
            Q0,58 0,44
            L0,14
            Q0,0 14,0
            Z
          "
          fill="currentColor"
        />
      </svg>

      <div className="relative z-10 h-full flex items-center px-6">
        {children}
      </div>
    </div>
  );
}