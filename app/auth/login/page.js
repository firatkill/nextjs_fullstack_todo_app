import LoginForm from "@/components/LoginForm";
import AuthContainer from "@/containers/AuthContainer";

export default function Login() {
  return (
    <>
      <AuthContainer>
        <LoginForm />
      </AuthContainer>
    </>
  );
}
