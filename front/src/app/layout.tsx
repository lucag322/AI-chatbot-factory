import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/ToastContext";
import Link from "next/link";
import { House } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chatbot Factory",
  description: "Créez et déployez des chatbots personnalisés",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="absolute flex items-center justify-center w-screen h-screen -z-20">
          <div className="container w-full h-full">
            <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 h-full">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`border-x border-slate h-full ${
                    index >= 3 ? "hidden sm:hidden md:block" : ""
                  } ${index >= 4 ? "md:hidden lg:block" : ""}`}
                ></div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 h-full sm:hidden">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="border-x border-gray h-full"></div>
              ))}
            </div>
          </div>
        </div>

        <ToastProvider>
          <div className="container mx-auto min-h-screen py-4 md:py-6 lg:py-8 ">
            <header className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Logo dans la première colonne */}
              <div className="flex items-center justify-start w-full h-full px-0.5 md:px-2 lg:px-3">
                <Link
                  href="/"
                  className="hidden lg:flex items-center"
                  prefetch={false}
                >
                  <House strokeWidth={1} />
                </Link>
              </div>

              {/* Espaces vides pour colonnes 2, 3, 4 */}
              <div className="hidden md:block"></div>
              <div className="hidden md:block"></div>
              <div className="hidden lg:block"></div>

              {/* Liens de navigation dans les colonnes 5 et 6 */}
              <div className="flex items-center justify-center w-full h-full">
                <Link
                  href="/chatbots"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-sm px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  prefetch={false}
                >
                  Chatbots
                </Link>
              </div>
              <div className="flex items-center justify-center w-full h-full">
                <Link
                  href="/chatbots/new"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-sm px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  prefetch={false}
                >
                  Add Chatbot
                </Link>
              </div>
            </header>
            <main className="h-[calc(100vh-100px)]">{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
