import localFont from "next/font/local";
import "./globals.css";
import DevHydrationWarningFilter from "@/components/DevHydrationWarningFilter";

const soehne = localFont({
  src: [
    {
      path: '../fonts/soehne-buch.woff2', 
      weight: '400',                      
      style: 'normal',
    },
    {
      path: '../fonts/soehne-leicht.woff2', 
      weight: '300',                        
      style: 'normal',
    },
    {
      path: '../fonts/soehne-kraftig.woff2', 
      weight: '500',                        
      style: 'normal',
    },
  ],
  variable: '--font-soehne',
  display: 'swap',
});

const tiemposLightItalic = localFont({
  src: "../fonts/tiempos-fine-light-italic.woff2",
  variable: "--font-tiempos-light-italic",
  display: "swap",
});

const tiemposLight = localFont({
  src: "../fonts/tiempos-fine-light.woff2",
  variable: "--font-tiempos-light",
  display: "swap",
});

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export const metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: "SB: Sales Page Builder",
  description: "Create custom sales pages",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${soehne.variable} ${tiemposLightItalic.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <DevHydrationWarningFilter />
        {children}
      </body>
    </html>
  );
}
