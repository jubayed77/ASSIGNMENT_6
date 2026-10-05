
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

//for gpt valo hobe tai
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

// title seo jono valo hobe
export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description: "Pick a lift, lock it into today's plan.",
};

//main layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
    <html lang="en" className={oswald.variable}>

      <body>

 
        <PlanProvider>

          {/*  Navbar */}
          <Navbar />

  {/* contnt */}
          <main className="min-h-screen max-w-6xl mx-auto px-4 py-8">
            {children}
          </main>

          {/* Website Footer */}
          <Footer />
{/* tost code  */}
          <Toaster
            position="top-right"
            toastOptions={{
              //  toast  style
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid #2a2a2a",
              },

              //  s tost 
              success: {
                iconTheme: {
                  primary: "#ccff00",
                  secondary: "#0a0a0a",
                },
              },
            }}
          />

        </PlanProvider>
      </body>
    </html>
  );
}