import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import ConvexProvider from "../components/providers/ConvexProvider";
import { Toaster } from "sonner";
import ModalProvider from "../components/providers/ModalProvider";
import { EdgeStoreProvider } from "../lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jotion",
  description: "The connected workspace where better faster work happens",
  icons : {
    icon : [
      {
        media : "(prefers-color-scheme : light)",
        url : "/logo.svg",
        href : "/logo.svg"
      },
      {
        media : "(prefers-color-scheme : dark)",
        url : "/logo-dark.svg",
        href : "/logo-dark.svg"
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-[#1f1f1f] `}>
      <ConvexProvider>
      <EdgeStoreProvider>
        <ThemeProvider
          attribute = "class"
          defaultTheme = "system"
          enableSystem
          disableTransitionOnChange
          storageKey = "jotion-theme-2"
        >
        <Toaster position="bottom-center" />
        <ModalProvider/>
          {children}
        </ThemeProvider>
      </EdgeStoreProvider>
      </ConvexProvider>
      </body>
    </html>
  );
}
