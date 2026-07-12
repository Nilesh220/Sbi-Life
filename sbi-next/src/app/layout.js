import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata = {
  title: {
    default: 'IdeationX 2026 — Bharat Begins With An Idea | SBI Life',
    template: '%s — IdeationX 2026 | SBI Life',
  },
  description: "SBI Life IdeationX 2026 — Bharat Begins With An Idea. India's most ambitious student innovation competition. 200 B Schools, 300,000+ student reach, 5 challenges to redefine life insurance for Bharat.",
  openGraph: {
    title: 'IdeationX 2026 — Bharat Begins With An Idea',
    description: "India's largest student innovation platform. Join 300,000+ student reach across 200 B Schools solving real Bharat challenges in life insurance.",
  },
};

export const viewport = {
  themeColor: '#020408',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
