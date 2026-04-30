import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <main className="h-dvh flex flex-col items-center gap-6 text-4xl p-4">
      <h1>Repair Tech</h1>
      <Button
        render={
          <button>
            <LoginLink>Sign In</LoginLink>
          </button>
        }
      ></Button>
    </main>
  );
};

export default LoginPage;
