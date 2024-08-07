import RegisterForm from "@/components/RegisterForm";
import AuthContainer from "@/containers/AuthContainer";

export default function Register() {
  return (
    <AuthContainer>
      <RegisterForm />
    </AuthContainer>
  );
}
