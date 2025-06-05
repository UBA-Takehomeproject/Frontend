import { AuthAppBar } from "@/components/custom-ui/auth-appbar";
import { Outlet } from "react-router-dom";
// import GoogleIcon from "frontend/public/svg/google.svg"
const AuthLayout = () => {
  return (
    <>
      <AuthAppBar />
      <div className="flex min-h-screen w-full">
        {/* Form Side */}
        <div className="flex-1">
          <Outlet />
        </div>

        {/* Image Side */}
        <div className="relative hidden lg:block lg:w-1/2 shrink-0">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/auth-page.jpg"
            alt="Background"
          />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
