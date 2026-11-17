import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppChrome from "@/components/shared/AppChrome";
import { CartProvider } from "@/components/cart/CartProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function ThemePreferenceScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(function(){var key="gadget-grove-theme";var theme=null;try{theme=localStorage.getItem(key)}catch(error){console.error("Could not read the Gadget Grove theme preference.",error)}if(theme!=="light"&&theme!=="dark"){theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.add(theme)})()`,
      }}
    />
  );
}

export const metadata: Metadata = {
  title: "Gadget Grove | Thoughtful Tech, Carefully Picked",
  description:
    "Discover thoughtful tech and everyday essentials, carefully picked at Gadget Grove.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemePreferenceScript />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <AppChrome>{children}</AppChrome>
        </CartProvider>
      </body>
    </html>
  );
}
