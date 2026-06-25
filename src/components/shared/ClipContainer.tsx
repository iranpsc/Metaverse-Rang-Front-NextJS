type ClipSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ClipSection({
  children,
  className = "",
}: ClipSectionProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <path
          d="
            M24 0
            H976
            Q1000 0 1000 24
            V500
            Q1000 530 980 550
            L920 590
            Q900 600 870 600
            H24
            Q0 600 0 576
            V24
            Q0 0 24 0
            Z
          "
          fill="currentColor"
        />
      </svg>

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}