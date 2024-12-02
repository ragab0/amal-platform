import "./auth.css";
import AuthNavbar from "@/app/(auth)/components/AuthNavbar";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page pb-[120px]">
      <AuthNavbar />
      {children}
    </div>
  );
}
