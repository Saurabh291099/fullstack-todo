import SignUp from "../templates/SignUp";

const SignUpPage = () => {
  const onSubmit = () => {
    alert("SignUp Form Submit");
  };
  return (
    <div className="grid place-content-center w-full h-[100vh]">
      <SignUp onSubmit={onSubmit} />
    </div>
  );
};

export default SignUpPage;
