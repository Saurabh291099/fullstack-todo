"use client";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";

interface LoginProps {
  onSubmit: () => void;
}

type LoginFormInputs = {
  name: string;
  phoneNumber: string;
  gender: string;
  country: string;
  hobbies: string;
  email: string;
  password: string;
};
const Login: React.FC<LoginProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form Submitted with data", data);
  };

  return (
    <div className="grid place-content-center p-10 rounded-xl gap-4 bg-white shadow-2xl">
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid place-content-center gap-4">
          <Input
            id="email"
            label="email"
            type="email"
            {...register("email", { required: "Email is Required" })}
            errorMessage={errors.email?.message}
          />
          <Input
            id="password"
            label="password"
            type="password"
            {...register("password", { required: "Password is Required." })}
            errorMessage={errors.password?.message}
          />

          <Button type="submit" label="Login" className="h-11" />
        </div>
      </form>
      <div className="flex justify-center items-center gap-1">
        <span>Do not have an Account</span>
        <Button
          type="submit"
          label="signup"
          className="border-0 bg-transparent hover:bg-transparent !text-blue-800 underline"
        />
      </div>
    </div>
  );
};

export default Login;
