
interface ButtonProps {
  label: string;
  type: "submit" | "reset" | "button";
  size?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-2 capitalize border rounded-md bg-[#0099FF] text-white hover:bg-amber-50 hover:text-black hover:cursor-pointer ${className}`}
    > 
      {label}
    </button>
  );
};

export default Button;
