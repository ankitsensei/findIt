import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("user");

    if (!token || !userId) {
      toast.error("Google sign in failed. Please try again.");
      navigate("/signin");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    toast.success("Signed in with Google successfully!");
    navigate("/");
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
};

export default OAuthSuccess;
