import "./globals.css";
import { Playfair_Display } from "next/font/google";

const romanticFont = Playfair_Display({ subsets: ["latin"] });

export const metadata = {
  title: "LoveVerse",
  description: "A Beautiful Love Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={romanticFont.className}>
        {children}
      </body>
    </html>
  );
}