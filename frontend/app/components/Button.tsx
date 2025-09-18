interface ButtonProps {
  label: string;
  type: "submit" | "reset" | "button";
  size?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-2 capitalize border rounded-md hover:bg-amber-50 hover:text-black hover:cursor-pointer"
    >
      {label}
    </button>
  );
};

export default Button;
