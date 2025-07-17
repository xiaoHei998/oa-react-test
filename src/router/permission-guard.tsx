import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Guard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("isLogin")) {
      navigate("/login");
    }
  }, []);

  if (!localStorage.getItem("isLogin")) {
    return <></>;
  }

  return <>{children}</>;
}
