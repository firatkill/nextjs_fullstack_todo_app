import RegisterForm from "@/components/registerFormm";
import AuthContainer from "@/containers/authContainer";

export default function Register() {
  return (
    <AuthContainer>
      <RegisterForm />
    </AuthContainer>
  );
}
