import type { Metadata } from "next";
import "./(root)//globals.css";
import { Navbar } from "../components";
import { Providers } from "./(root)/providers";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../static/fonts/PretendardVariable.woff2",
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
        </Providers>
      </body>
    </html>
  );
}
