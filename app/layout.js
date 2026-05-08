export const metadata = {
  title: 'EGY STORE API',
  description: 'Next.js backend for EGY STORE'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, fontFamily: 'Cairo, sans-serif', background: '#f8fafc', color: '#111827' }}>
        {children}
      </body>
    </html>
  );
}
