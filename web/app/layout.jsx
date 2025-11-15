import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {title: 'The Dugout'}

export default function RootLayout({
  children
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head title="The Dugout"/>
      <body className={`${geistSans.className} antialiased pt-20`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
