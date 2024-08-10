import RegisterForm from "@/components/registerForm";
import AuthContainer from "@/containers/authContainer";

export default function Register() {
  return (
    <AuthContainer>
      <RegisterForm />
    </AuthContainer>
  );
}
