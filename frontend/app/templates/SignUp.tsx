"use client";
import Input from "../components/Input";
import Button from "../components/Button";
import DropdownButton from "../components/Dropdown";
import Label from "../components/Label";
import { Controller } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";
import { MenuProps } from "antd";

interface SignupProps {
  onSubmit: (data: SignUpFormInputs) => void;
  hobbiesItems: MenuProps["items"];
  genderItems: MenuProps["items"];
  countryItems: MenuProps["items"];
  form: UseFormReturn<SignUpFormInputs>;
  handleLoginBtn:()=> void;
}

export type SignUpFormInputs = {
  name: string;
  phoneNumber: string;
  gender: string;
  country: string;
  hobbies: string;
  email: string;
  password: string;
};
const SignUp: React.FC<SignupProps> = ({
  form,
  hobbiesItems,
  genderItems,
  countryItems,
  onSubmit,
  handleLoginBtn
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  return (
    <div className=" grid place-content-center p-8 rounded-xl gap-2 bg-white shadow-2xl ">
      <h1 className="text-center text-3xl font-bold">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid place-content-center gap-2 w-[25rem]">
          <Input
            id="name"
            label="Name"
            type="text"
            {...register("name", { required: "Name is Required." })}
            errorMessage={errors.name?.message}
            className="w-[20rem]"
          />
          <Input
            id="phoneNumber"
            label="Phone Number"
            type="text"
            {...register("phoneNumber", {
              required: "Phone Number is Required",
            })}
            errorMessage={errors.phoneNumber?.message}
          />
          <div className="grid gap-2">
            <Label id="" labelFor="">
              Gender
            </Label>

            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is Required." }}
              render={({ field }) => (
                <DropdownButton
                  items={genderItems}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Gender"
                />
              )}
            />

            {errors.gender?.message && <span>{errors.gender?.message}</span>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label id="" labelFor="">
                Country
              </Label>

              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is Required." }}
                render={({ field }) => (
                  <DropdownButton
                    items={countryItems}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Country"
                  />
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label id="" labelFor="">
                Hobbies
              </Label>
              <Controller
                name="hobbies"
                control={control}
                rules={{ required: "Hobbies are Required." }}
                render={({ field }) => (
                  <DropdownButton
                    items={hobbiesItems}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Hobbies"
                  />
                )}
              />
            </div>
          </div>

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

          <Button type="submit" label="signup" className="h-11" />
        </div>
      </form>
      <div className="flex justify-center items-center gap-2">
        <span>Already have an Account</span>
        <Button
          type="button"
          label="Login"
          onClick={handleLoginBtn}
          className="border-0 bg-transparent hover:bg-transparent !text-blue-800 underline"
        />
      </div>
    </div>
  );
};

export default SignUp;
