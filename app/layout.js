import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import './main.css';
import { Inter } from 'next/font/google';
import Header from "@/app/common/components/header";
import Footer from "@/app/common/components/footer";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Header />
      {children} {/* This will render the page content */}
      <Footer />
      </body>
      </html>
  );
}