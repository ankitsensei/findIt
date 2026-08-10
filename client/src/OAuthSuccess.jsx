import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    localStorage.setItem("token", token);

    navigate("/");
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
};

export default OAuthSuccess;
