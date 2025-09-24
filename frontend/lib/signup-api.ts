import { api } from "./api";
import { SignUpFormInputs } from "@/app/templates/SignUp";
export const handleSignUp = async (data: SignUpFormInputs) => {
    console.log("Submitting signup data:", data);

    const payload = {
    name: data.name,
    phoneNumber: data.phoneNumber,
    email: data.email,
    password: data.password,
    gender: data.gender,
    country: data.country,
    hobbies: data.hobbies,
  };
  try {
    const response = await api.post("/auth/signup", payload);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.log("Signup Error:", error);
  }
};
