"use client";
import Login from "../templates/Login";
import { useRouter } from "next/navigation";
import { handleLogin, LoginFormInputs } from "@/lib/login-api";

const LoginPage = () => {
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const user = await handleLogin(data);
      console.log("Login response:", user);
      if(user?.access_token){
        localStorage.setItem("token", user.access_token);

        const payload = JSON.parse(atob(user.access_token.split('.')[1]))
        localStorage.setItem("userId", payload);
        router.push("/todo");
      }else{
        console.log("Invalid email or password")
      }
    } catch (error) {
      console.log("facing error while login:", error);
    }
  };

  const router = useRouter();
  const handleSignUpBtn = () => {
    router.push("/signup");
  };
  return (
    <div className="grid place-content-center w-full h-[100vh]">
      <Login onSubmit={onSubmit} handleSignUpBtn={handleSignUpBtn} />
    </div>
  );
};

export default LoginPage;
