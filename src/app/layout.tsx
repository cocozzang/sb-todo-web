import type { Metadata } from "next";
import { Navbar } from "../components";
import { Providers } from "./(root)/providers";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "./(root)//globals.css";
import "react-toastify/dist/ReactToastify.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`${pretendard.className} my-4`}>
        <Providers>
          <Navbar />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
