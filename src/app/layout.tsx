import type { Metadata } from 'next';
import { Inter, Baskervville, Montserrat } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context';
import Head from 'next/head';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['100','200','300','400','500','600','700','800','900'] });
const baskervville = Baskervville({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Viert',
  description: 'Em breve um novo site',
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000900",
  appleWebApp: {
    statusBarStyle: "black-translucent",
    capable: true,
    title: "Viert",
  },
  authors: [
    {
      name: "Majors Solutions",
      url: "https://www.majorssolutions.com.br",
    },
  ],
  applicationName: "Viert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="pt-br">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000900" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Viert" />
          <link rel="icon" href="/favicon.ico" />
          <title>Viert</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          
          {/* description */}
          <meta name="description" content="Em breve um novo site" />

          {/* keywords */}
          <meta name="keywords" content="
            viert, atelier, moda, vestido, noiva, casamento, festa, roupas, femininas, feminino, feminina, femininos, festivais, eventos, festa, festas, evento, eventos, festa de casamento, festas de casamento, festa de noivado, festas de noivado, festa de debutante, festas de debutante, festa de formatura, festas de formatura, festa de aniversário, festas de aniversário, festa de confraternização, festas de confraternização, festa de natal, festas de natal, festa de ano novo, festas de ano novo, festa de réveillon, festas de réveillon, festa de carnaval, festas de carnaval, festa de festa junina, festas de junina, festa de festa julina, festas de julina, festa de halloween, festas de halloween, festa de dia das bruxas, festas de  dia das bruxas, festa de dia dos mortos, festas de dia dos mortos, festa de dia de finados, festas de dia de finados, festa de dia de todos os santos, festas de de dia de todos os santos, festa de dia de ação de graças, festas de de dia de ação de graças, festa de dia de natal, festas de de dia de natal, festa de dia de ano novo, festas de de dia de ano novo, festa de dia de réveillon, festas de de dia de réveillon, festa de dia de carnaval, festas de de dia de carnaval, festa de dia de festa junina, festas de de dia de festa junina, festa de dia de festa julina, festas de de dia de festa julina, festa de dia de festa de halloween, festas de de dia de festa de halloween, festa de dia de festa de dia das bruxas, romantico, elegante, brilhoso, brilhante, brilho, brilhos
          " />

          {/* robots */}
          <meta name="robots" content="index, follow" />

          {/* og */}
          <meta property="og:title" content="Viert" />
          <meta property="og:description" content="Em breve um novo site" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://viertatelier.com" />
          <meta property="og:image" content="https://viert.com/assets/brand/logo.png" />
          <meta property="og:site_name" content="Viert" />
          <meta property="og:locale" content="pt_BR" />

          {/* twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Viert" />
          <meta name="twitter:description" content="Em breve um novo site" />
          <meta name="twitter:image" content="https://viert.com/assets/brand/logo.png" />
          <meta name="twitter:site" content="@viertatelier" />
          <meta name="twitter:creator" content="@viertatelier" />

          {/* author */}
          <meta name="author" content="Majors Solutions" />
          <link rel="author" href="https://www.majorssolutions.com.br" />

          {/* application name */}
          <meta name="application-name" content="Viert" />
        </Head>
        <body className={`${montserrat.className} ${baskervville.className}`}>
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
