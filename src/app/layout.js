import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PrimeCart Hub | Premium E-Commerce Store",
  description: "Shop the best selection of skincare, electronics, apparel, and lifestyle items with fast shipping and simple experience.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-gray-800" suppressHydrationWarning>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
