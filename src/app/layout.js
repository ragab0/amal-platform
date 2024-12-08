import "./globals.css";
import { Cairo } from "next/font/google";
import StoreProvider from "@/providers/ReduxProvider";
import { devLinks } from "@/assets/data/dev";
import Link from "next/link";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://amal-dev.vercel.app"),
  title: {
    template: "%s | منصة عمل",
    default: "منصة عمل - منصتك المتكاملة للتوظيف وبناء السيرة الذاتية",
  },
  description:
    "منصة عمل هي منصة متكاملة تجمع بين الباحثين عن عمل وأصحاب العمل، مع خدمات بناء السيرة الذاتية والاستشارات المهنية",
  keywords: [
    "منصة عمل",
    "وظائف",
    "سيرة ذاتية",
    "توظيف",
    "استشارات مهنية",
    "فرص عمل",
    "تطوير مهني",
    "مستشارين",
  ],
  authors: [{ name: "منصة عمل" }],
  creator: "منصة عمل",
  publisher: "منصة عمل",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://amal-dev.vercel.app",
    siteName: "منصة عمل",
    title: "منصة عمل - منصتك المتكاملة للتوظيف وبناء السيرة الذاتية",
    description:
      "منصة عمل هي منصة متكاملة تجمع بين الباحثين عن عمل وأصحاب العمل، مع خدمات بناء السيرة الذاتية والاستشارات المهنية",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://amal-dev.vercel.app",
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "employment",
  classification: "Employment Platform",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        {process.env.NODE_ENV === "production" && (
          <ul className="container px-4 mx-auto flex justify-center items-center py-6 md:py-10 gap-4">
            {devLinks.map(({ name, href }, index) => (
              <li key={index}>
                <Link
                  href={href}
                  className="text-second text-[20px] font-medium hover:text-accent transition-colors"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
