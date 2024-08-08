import RegisterForm from "@/components/registerForm";
import AuthContainer from "@/containers/AuthContainer";

export default function Register() {
  return (
    <AuthContainer>
      <RegisterForm />
    </AuthContainer>
  );
}
