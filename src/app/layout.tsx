import type { Metadata } from 'next';
import { Inter, Baskervville, Montserrat } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['100','200','300','400','500','600','700','800','900'] });
const baskervville = Baskervville({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Viert',
  description: 'Em breve um novo site',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="pt-br">
        <body className={`${montserrat.className} ${baskervville.className}`}>
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
