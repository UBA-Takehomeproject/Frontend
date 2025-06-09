import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
// import GoogleIcon from "frontend/public/svg/google.svg"

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, signupLoading, signupError, signupHasError } = useAuth();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup({
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        password: formData.password,
        photoURL: "", // You might want to add photo upload functionality
        role: "USER", // Default role for new users
      });
      toast({
        title: "Success",
        description: "Your account has been created successfully.",
      });
      navigate("/"); // Redirect to sign in page after successful signup
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
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
            Sign up a new account
          </h2>
          <p className="mt-2 text-sm ">
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="font-semibold text-uba-600 hover:text-uba-500"
            >
              Sign In
            </a>
          </p>
        </div>

        <div className="mt-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fname">First name</Label>
              <Input
                id="fname"
                name="fname"
                type="text"
                required
                autoComplete="given-name"
                value={formData.fname}
                onChange={handleChange}
                disabled={signupLoading}
              />
            </div>
            <div>
              <Label htmlFor="lname">Last name</Label>
              <Input
                id="lname"
                name="lname"
                type="text"
                required
                autoComplete="family-name"
                value={formData.lname}
                onChange={handleChange}
                disabled={signupLoading}
              />
            </div>
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
                disabled={signupLoading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                disabled={signupLoading}
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
                  disabled={signupLoading}
                />
                <Label htmlFor="remember-me">Remember me</Label>
              </div>
            </div>

            {signupHasError && (
              <div className="text-sm text-red-600">
                {signupError?.message || "Failed to create account. Please try again."}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-uba-red hover:bg-uba-600"
              disabled={signupLoading}
            >
              {signupLoading ? "Creating account..." : "Sign Up"}
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
                disabled={signupLoading}
              >
                <img src="/svg/google.svg" className="h-5 w-5" alt="Google" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 border-uba-300"
                disabled={signupLoading}
              >
                <img src="/svg/facebook.svg" className="h-5 w-5" alt="Facebook" />
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
