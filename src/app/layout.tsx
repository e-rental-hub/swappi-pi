import type { Metadata } from "next";
import { Lato } from 'next/font/google';
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const lato = Lato({ weight: '400', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: "Xchange Pi",
  description: "swap ypur local currency for Pi Network coins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        className={`bg-background text-black ${lato.className} antialiased`}
      >
        <div className="flex flex-col min-h-screen max-w-[760px] mx-auto bg-background text-foreground pb-16">
          <ThemeProvider>
              <TooltipProvider>      
                {children}
              <ToastContainer />   
            </TooltipProvider> 
          </ThemeProvider>          
        </div> 
      </body>
    </html>
  );
}
