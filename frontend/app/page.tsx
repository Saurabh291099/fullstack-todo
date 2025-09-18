"use client";

import SignUp from "./templates/SignUp";

export default function Home() {
  const onSubmit = () => {
    alert("SignUp Form Submit");
  };
  return (
    <div className="w-full h-full">
      <SignUp onSubmit={onSubmit} />
    </div>
  );
}
