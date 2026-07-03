import { Epilogue, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/Footer";
import { HeaderThemeProvider } from "./HeaderThemeProvider";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "IKAAI India - Unlocking Insights, Transforming Lives",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="min-h-full flex flex-col">
        <HeaderThemeProvider>
          <Header />
          {children}
          <Footer />
        </HeaderThemeProvider>
      </body>
    </html>
  );
}
