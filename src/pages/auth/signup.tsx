import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import GoogleIcon from "frontend/public/svg/google.svg"
const SignupPage = () => {
  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-8 text-2xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm ">
            I have an account?{" "}
            <a
              href="/auth/signin"
              className="font-semibold  text-uba-600 hover:text-uba-500"
            >
              Sign In
            </a>
          </p>
        </div>

        <div className="mt-10">
          <form className="space-y-6">
            <div>
              <Label htmlFor="email">First name</Label>
              <Input id="email" type="email" required autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="email">Last name</Label>
              <Input id="email" type="email" required autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" required autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
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

            <Button
              type="submit"
              className="w-full bg-uba-red hover:bg-uba-600"
            >
              Sign Up
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
              <Button variant="outline" className="w-full gap-2 border-uba-300">
                <img src="/svg/google.svg" className="h-5 w-5" />
                Google
              </Button>
              <Button variant="outline" className="w-full gap-2 border-uba-300">
                <img src="/svg/facebook.svg" className="h-5 w-5" />
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
