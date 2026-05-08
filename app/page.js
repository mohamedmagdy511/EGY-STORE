export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main style={{ padding: '40px', maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ background: '#111827', color: '#fff', borderRadius: '24px', padding: '28px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2.25rem' }}>EGY STORE Backend</h1>
        <p style={{ margin: '16px 0 0', fontSize: '1rem', color: '#cbd5e1' }}>
          تم تحويل الـ backend إلى Next.js API routes.
        </p>
      </div>

      <section style={{ marginTop: '32px', display: 'grid', gap: '18px' }}>
        <div style={{ padding: '18px', borderRadius: '18px', background: '#fff', boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)' }}>
          <h2 style={{ margin: '0 0 10px', fontSize: '1.1rem' }}>نقاط الوصول</h2>
          <ul style={{ paddingLeft: '18px', margin: 0, color: '#334155' }}>
            <li>/api/health</li>
            <li>/api/users?email=your@email.com</li>
            <li>/api/login</li>
            <li>/api/register</li>
            <li>/api/pending-count</li>
          </ul>
        </div>
        <div style={{ padding: '18px', borderRadius: '18px', background: '#e2e8f0', color: '#0f172a' }}>
          <p style={{ margin: 0, lineHeight: 1.7 }}>
            استخدم `npm install` ثم `npm run dev` لتشغيل Next.js. إذا كنت تريد، أقدر أنقل لك صافي واجهة المستخدم إلى Next.js بالكامل أيضاً.
          </p>
        </div>
      </section>
    </main>
  );
}
