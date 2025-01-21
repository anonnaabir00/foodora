'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import './main.css';
import { Inter } from 'next/font/google';
import Topbar from "@/app/common/components/topbar";
import Header from "@/app/common/components/header";
import Footer from "@/app/common/components/footer";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const isCheckoutPage = pathname === '/checkout';

    return (
        <html lang="en">
        <body className={inter.className}>
        {/*<Topbar />*/}
        {!isCheckoutPage && <Header />}
        {children}
        {!isCheckoutPage && <Footer />}
        </body>
        </html>
    );
}