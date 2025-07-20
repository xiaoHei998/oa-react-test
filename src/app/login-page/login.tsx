import { LoginForm } from "@/components/login-form";
import { useNavigate } from "react-router-dom";
export default function TestLogin() {
  const navigate = useNavigate();
  const onLogin = () => {
    localStorage.setItem("isLogin", "true");
    navigate("/");
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginForm onLogin={onLogin} />
    </div>
  );
}
