"use client";
import { MenuProps } from "antd";
import SignUp, { SignUpFormInputs } from "../templates/SignUp";
import { handleSignUp } from "@/lib/signup-api";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
const SignUpPage = () => {
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

  const router = useRouter();
  const form = useForm<SignUpFormInputs>();

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      await handleSignUp(data);
      form.reset();
      router.push("/login");
      console.log("signupData", data)
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  const handleLoginBtn = () => {
    router.push("/login");
  };
  return (
    <div className="grid place-content-center w-full h-[100vh]">
      <SignUp
        hobbiesItems={hobbiesItems}
        countryItems={countryItems}
        genderItems={genderItems}
        form={form}
        onSubmit={onSubmit}
        handleLoginBtn={handleLoginBtn}
      />
    </div>
  );
};

export default SignUpPage;
