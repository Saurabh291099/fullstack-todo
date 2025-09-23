import Login from "../templates/Login";

const LoginPage = () => {
  const onSubmit = () => {
    alert("SignUp Form Submit");
  };
  return (
    <div className="grid place-content-center w-full h-[100vh]">
      <Login onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
