import './globals.css';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const distantGalaxy = localFont({
  variable: '--font-distant-galaxy',
  src: [
    {
      path: './fonts/SF Distant Galaxy.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'The Force Directory',
  description: 'A dashboard for in-depth star wars charachters exploration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${distantGalaxy.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
