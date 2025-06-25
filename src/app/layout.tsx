import Head from 'next/head'
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "It network",
  description: "Rede social para estudantes e profissionais de tecnologia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/public/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}