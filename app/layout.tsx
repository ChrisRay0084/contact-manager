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
      <body className="relative min-h-screen bg-gray-50">
        {/* Full-page background image */}
        <div
          className="fixed inset-0 bg-cover bg-center opacity-60 -z-10"
          style={{ backgroundImage: "url('/cm_bg.png')" }}
        ></div>

        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}