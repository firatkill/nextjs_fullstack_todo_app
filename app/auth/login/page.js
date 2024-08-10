import LoginForm from "@/components/loginForm";
import AuthContainer from "@/containers/authContainerr";

export default function Login() {
  return (
    <>
      <AuthContainer>
        <LoginForm />
      </AuthContainer>
    </>
  );
}
