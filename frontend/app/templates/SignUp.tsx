"use client";
import Input from "../components/Input";
import Button from "../components/Button";
import { MenuProps } from "antd";
import DropdownButton from "../components/Dropdown";
import Label from "../components/Label";
import { Controller, useForm } from "react-hook-form";

interface SignupProps {
  onSubmit: () => void;
}

type SignUpFormInputs = {
  name: string;
  phoneNumber: string;
  gender: string;
  country: string;
  hobbies: string;
  email: string;
  password: string;
};
const SignUp: React.FC<SignupProps> = ({}) => {
  const genderItems: MenuProps["items"] = [
    { label: "Male", key: "male" },
    { label: "Female", key: "female" },
  ];

  const countryItems: MenuProps["items"] = [
    { label: "India", key: "india" },
    { label: "USA", key: "usa" },
    { label: "China", key: "china" },
    { label: "Russia", key: "russia" },
  ];

  const hobbiesItems: MenuProps["items"] = [
    { label: "Cricket", key: "cricket" },
    { label: "Football", key: "football" },
    { label: "Hockey", key: "hockey" },
    { label: "chess", key: "chess" },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  const onSubmit = (data: SignUpFormInputs) => {
    console.log("Form Submitted with data", data);
  };

  // const handleMenuClick: MenuProps["onClick"] = (e) => {
  //   alert(`click: ${e.key}`);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid place-content-center gap-4 min-h-[100vh] max-h-[100vh]">
        <Input
          id="name"
          label="Name"
          type="text"
          {...register("name", { required: "Name is Required." })}
          errorMessage={errors.name?.message}
        />
        <Input
          id="phoneNumber"
          label="Phone Number"
          type="text"
          {...register("phoneNumber", { required: "Phone Number is Required" })}
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
        <Button type="submit" label="signup" />
      </div>
    </form>
  );
};

export default SignUp;
