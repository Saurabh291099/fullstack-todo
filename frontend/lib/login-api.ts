
export type LoginFormInputs = {
  email: string;
  password: string;
};


export const handleLogin = async (data: LoginFormInputs) => {
  const res = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (res.status === 401) {
    return { error: "Invalid email or password" };
  }

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result; //{ access_token, refresh_token }
};
