import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Contact Manager",
  description: "A simple contact management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-gray-50 text-gray-900 antialiased">
        <a
          href="#main-content"
          className="sr-only rounded bg-blue-700 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Skip to main content
        </a>
        {/* Full-page background image */}
        <div
          className="fixed inset-0 bg-cover bg-center opacity-100 -z-10"
          style={{ backgroundImage: "url('/cm_bg.png')" }}
        ></div>

        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main id="main-content" className="container mx-auto flex-1 px-4 py-8" tabIndex={-1}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}