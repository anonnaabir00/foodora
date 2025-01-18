// app/checkout/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import '../main.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function CheckoutLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    );
}