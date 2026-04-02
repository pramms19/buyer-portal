import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap", // Prevents layout shift
  variable: "--font-poppins", // Assign a CSS variable
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify desired weights
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
