const createIconComponent = (src: string, altText: string) => {
  const IconComponent: React.FC<IconProps> = ({
    size = 24,
    color = "currentColor",
    className = "",
  }) => (
    <img
      src={src}
      alt={altText}
      width={size}
      height={size}
      style={{ color }}
      className={className}
    />
  );

  return IconComponent;
};

export default createIconComponent;
