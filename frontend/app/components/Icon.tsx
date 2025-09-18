interface IconProps {
  name: string;
  size?: string;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = "text-base",
  color = "text-[#9C9CAF]",
  className,
}) => {
  return <i className={` icon-${name} ${size}  ${color} ${className}`}></i>;
};

export default Icon;
