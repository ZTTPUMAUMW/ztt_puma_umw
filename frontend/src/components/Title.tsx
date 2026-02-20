interface TitleProps {
  primaryText: string;
  secondaryText?: string;
  size?: "32-24" | "24-18" | "default";
  variant?: "h1-p" | "h2-p" | "h3-p";
  centered?: boolean;
  className?: string;
}

export default function Title({
  primaryText,
  secondaryText,
  size = "default",
  variant = "h2-p",
  centered = false,
  className = "",
}: TitleProps) {
  const [primaryTag, secondaryTag] = variant.split("-") as ["h1" | "h2" | "h3", "p"];
  const PrimaryTag = primaryTag;
  const SecondaryTag = secondaryTag;

  const primarySize = size === "32-24" ? "3.2rem" : size === "24-18" ? "2.4rem" : "2rem";
  const secondarySize = size === "32-24" ? "2.4rem" : size === "24-18" ? "1.8rem" : "1.6rem";

  return (
    <div className={`title-component ${centered ? "centered" : ""} ${className}`}>
      <PrimaryTag
        style={{
          fontSize: primarySize,
          fontWeight: 700,
          marginBottom: secondaryText ? "1.5rem" : "0",
          lineHeight: 1.2,
        }}
      >
        {primaryText}
      </PrimaryTag>
      {secondaryText && (
        <SecondaryTag
          style={{
            fontSize: secondarySize,
            lineHeight: 1.6,
            color: "#666",
          }}
        >
          {secondaryText}
        </SecondaryTag>
      )}
    </div>
  );
}
