import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
// import GoogleIcon from "frontend/public/svg/google.svg"

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginLoading, loginError, loginHasError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast({
        title: "Success",
        description: "You have been successfully logged in.",
      });
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-8 text-2xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm ">
            Dont have an account?{" "}
            <a
              href="/auth/signup"
              className="font-semibold  text-uba-600 hover:text-uba-500"
            >
              Sign up
            </a>
          </p>
        </div>

        <div className="mt-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loginLoading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                disabled={loginLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, rememberMe: !!checked }))
                  }
                  disabled={loginLoading}
                />
                <Label htmlFor="remember-me">Remember me</Label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-sm font-medium text-uba-600 hover:text-uba-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {loginHasError && (
              <div className="text-sm text-red-600">
                {loginError?.message || "Failed to login. Please try again."}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-uba-red hover:bg-uba-600"
              disabled={loginLoading}
            >
              {loginLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-uba-100" />
              </div>
              <div className="relative flex justify-center text-sm font-medium">
                <span className="bg-white px-6 text-uba-800 rounded-sm">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full gap-2 border-uba-300"
                disabled={loginLoading}
              >
                <img src="/svg/google.svg" className="h-5 w-5" alt="Google" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 border-uba-300"
                disabled={loginLoading}
              >
                <img
                  src="/svg/facebook.svg"
                  className="h-5 w-5"
                  alt="Facebook"
                />
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
