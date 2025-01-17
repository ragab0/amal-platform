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
    url: "https://www.ragab.shop",
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
  let preloadedState;
  let initialError = null;
  try {
    preloadedState = await getInitialAuthState();
  } catch (error) {
    initialError = {
      message: error.message || "حدث خطأ أثناء تحميل البيانات",
      status: error.status || 500,
      code: error.code || "UNKNOWN_ERROR",
    };
    console.log("getInitialAuthState error", error);

    preloadedState = {
      auth: {
        user: {},
        isAuthenticated: false,
        loading: false,
        error: initialError.message,
      },
    };
  }

  return (
    <html lang="ar" dir="rtl">
      {/* <body className={cairo.className} suppressHydrationWarning> */}
      <body className={cairo.className}>
        <StoreProvider preloadedState={preloadedState}>
          <LoadingWrapper>
            <InitialDataLoader initialError={initialError}>
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
