import RegisterForm from "@/components/registerFormm";
import AuthContainer from "@/containers/authContainerr";

export default function Register() {
  return (
    <AuthContainer>
      <RegisterForm />
    </AuthContainer>
  );
}
