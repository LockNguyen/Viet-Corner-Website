import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vietnamese Evangelical Church",
  description: "Making God known through life together",
  keywords: "Vietnamese church, evangelical church, discipleship, community, faith, Vietnamese Christians",
  authors: [{ name: "Vietnamese Evangelical Church" }],
  creator: "Vietnamese Evangelical Church",
  publisher: "Vietnamese Evangelical Church",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vietnamesechurch.com'),
  openGraph: {
    title: "Hội Thánh Tin Lành Việt Nam",
    description: "Chúng tôi là một cộng đồng nhỏ bé, đơn giản, cùng nhau học hỏi và lớn lên trong đức tin.",
    url: 'https://vietnamesechurch.com',
    siteName: 'Vietnamese Evangelical Church',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hội Thánh Tin Lành Việt Nam",
    description: "Chúng tôi là một cộng đồng nhỏ bé, đơn giản, cùng nhau học hỏi và lớn lên trong đức tin.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
