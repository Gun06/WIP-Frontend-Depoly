import { Suspense } from "react";
import { LoginScreen } from "@/main/features/auth/components/LoginScreen";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-run-muted">
          로딩 중…
        </div>
      }
    >
      <LoginScreen />
    </Suspense>
  );
}
