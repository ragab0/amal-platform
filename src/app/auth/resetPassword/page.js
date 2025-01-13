import "@/app/(auth)/auth.css";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";

async function verifyToken(token, email) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-reset-token?token=${token}&email=${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email }),
      }
    );
    if (!res.ok) {
      throw new Error("Invalid token");
    }
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function ResetPasswordPage({ searchParams }) {
  const token = await searchParams?.token;
  const email = await searchParams?.email;

  if (!token || !email) {
    redirect("/login");
  }
  const isValid = await verifyToken(token, email);
  if (!isValid) {
    redirect("/login");
  }

  return (
    <main className="auth-page h-screen bg-[#fff]">
      <header className="auth-page-header bg-inherit">
        <h1 className="heading text-main-light">استعادة كلمة المرور</h1>
      </header>
      <div className="auth-page-body">
        <div className="auth-box border border2">
          <ResetPasswordForm email={email} token={token} />
        </div>
      </div>
    </main>
  );
}
