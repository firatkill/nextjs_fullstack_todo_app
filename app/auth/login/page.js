import LoginForm from "@/components/loginForm";
import AuthContainer from "@/containers/authContainer";

export default function Login() {
  return (
    <>
      <AuthContainer>
        <LoginForm />
      </AuthContainer>
    </>
  );
}
