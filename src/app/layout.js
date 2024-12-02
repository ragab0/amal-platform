// import { Cairo } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/providers/ReduxProvider";

// const cairo = Cairo({
//   subsets: ["latin", "arabic"],
//   variable: "--font-cairo",
//   display: "swap",
// });

export const metadata = {
  title: "Amal",
  description: "Amal is a platform to evluate and build ATS user-friendly CVs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${cairo.variable}`}> */}
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
