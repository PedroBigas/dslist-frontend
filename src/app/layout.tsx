import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DSList - Sua Lista de Games",
    template: "%s | DSList"
  },
  description: "Descubra, organize e explore uma vasta coleção de games. Crie suas próprias listas personalizadas e compartilhe suas descobertas com outros jogadores.",
  keywords: ["games", "jogos", "lista de jogos", "catálogo de games", "descobrir jogos", "organizar games"],
  authors: [{ name: "DSList Team" }],
  creator: "DSList",
  publisher: "DSList",
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
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://dslist.com',
    siteName: 'DSList',
    title: 'DSList - Sua Lista de Games',
    description: 'Descubra, organize e explore uma vasta coleção de games. Crie suas próprias listas personalizadas e compartilhe suas descobertas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DSList - Sua Lista de Games',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSList - Sua Lista de Games',
    description: 'Descubra, organize e explore uma vasta coleção de games.',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <Header />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
