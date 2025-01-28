import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Cairo } from "next/font/google";
import { getInitialAuthState } from "@/components/actions/auth";
import { ToastContainer } from "react-toastify";
import StoreProvider from "@/providers/ReduxProvider";
import LoadingWrapper from "@/providers/LoadingWrapper";
import SocketNotificationInitializer from "@/providers/SocketNotificationInitializer";
import InitialDataLoader from "@/components/InitialDataLoader";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://www.job.sa"),
  title: {
    template: "%s | منصة نبذة",
    default: "منصة نبذة - منصتك المتكاملة لبناء السيرة الذاتية",
  },
  description:
    "منصة نبذة هي منصة متكاملة تجمع بين الباحثين عن عمل وأصحاب العمل، مع خدمات بناء السيرة الذاتية والاستشارات المهنية",
  keywords: [
    "منصة نبذة",
    "وظائف",
    "سيرة ذاتية",
    "توظيف",
    "استشارات مهنية",
    "فرص نبذة",
    "تطوير مهني",
    "مستشارين",
  ],
  authors: [{ name: "منصة نبذة" }],
  creator: "منصة نبذة",
  publisher: "منصة نبذة",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://www.ragab.shop",
    siteName: "منصة نبذة",
    title: "منصة نبذة - منصتك المتكاملة لبناء السيرة الذاتية",
    description:
      "منصة نبذة هي منصة متكاملة تجمع بين الباحثين عن عمل وأصحاب العمل، مع خدمات بناء السيرة الذاتية والاستشارات المهنية",
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
    canonical: "https://www.ragab.shop",
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

export default async function RootLayout({ children }) {
  // return (
  //   <html lang="ar" dir="rtl">
  //     <body>
  //       <InitialDataLoader initialErrorMessage={"مغلق مؤقتا!"} />
  //     </body>
  //   </html>
  // );
  const preloadedState = await getInitialAuthState();

  return (
    <html lang="ar" dir="rtl">
      {/* <body className={cairo.className} suppressHydrationWarning> */}
      <body className={cairo.className}>
        <StoreProvider preloadedState={preloadedState}>
          <LoadingWrapper>
            <InitialDataLoader initialErrorMessage={preloadedState.auth.error}>
              <SocketNotificationInitializer />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                toastClassName="font-normal"
              />
              {children}
            </InitialDataLoader>
          </LoadingWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
