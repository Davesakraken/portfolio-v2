interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "subtle" | "strong" | "card";
  blur?: "sm" | "md" | "lg" | "xl";
  border?: boolean;
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  glow?: boolean;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  variant = "default",
  blur = "md",
  border = true,
  shadow = "lg",
  rounded = "lg",
  glow = false,
  className = "",
  ...props
}) => {
  const variantStyles = {
    default: "bg-white/10 dark:bg-white/5",
    subtle: "bg-white/5 dark:bg-white/3",
    strong: "bg-white/20 dark:bg-white/10",
    card: "bg-white/15 dark:bg-gray-900/20",
  };

  const blurStyles = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  const borderStyles = border ? "border border-white/20 dark:border-white/10" : "";

  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg shadow-black/5 dark:shadow-black/20",
    xl: "shadow-xl shadow-black/10 dark:shadow-black/30",
  };

  const roundedStyles = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const glowStyles = glow
    ? "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-r before:from-blue-500/20 before:via-blue-500/20 before:to-blue-500/20 before:blur-xl before:-z-10 relative"
    : "";

  const combinedClassName = [
    variantStyles[variant],
    blurStyles[blur],
    borderStyles,
    shadowStyles[shadow],
    roundedStyles[rounded],
    glowStyles,
    "transition-all duration-300 ease-in-out",
    "hover:bg-white/15 dark:hover:bg-white/8 hover:border-white/30 dark:hover:border-white/20",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClassName} {...props}>
      <p>{children}</p>
    </div>
  );
};

export default GlassContainer;
