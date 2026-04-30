interface GradientLabelProps {
  label: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "bold";
  gradient?: boolean;
  isDark?: boolean;
}

const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
  "2xl": "lg:text-3xl text-xl ",
  "3xl": "lg:text-4xl text-2xl ",
  "4xl": "text-5xl",
};

const weightMap = {
  normal: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

const GradientLabel = ({
  label,
  size = "xl",
  weight = "bold",
  gradient = true,
  isDark = true
}: GradientLabelProps) => {
  return (
    <p
      className={`
        ${sizeMap[size]} 
        ${weightMap[weight]} 
        ${gradient ? 
          `bg-linear-to-l from-[#252422] to-[#8B8780] bg-clip-text text-transparent`
          : `${isDark ? "text-white" : "text-black" }`
        }
      `}
    >
      {label}
    </p>
  );
};

export default GradientLabel;