import Link from 'next/link';

export function PalaceFooter() {
  return (
    <footer style={{ background: 'oklch(7% 0.004 260)', borderTop: '1px solid rgba(212,160,23,0.15)', padding: '64px 24px 32px' }}>
      <div className="pfooter-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 40 }}>
        <div>
          <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.125rem', color: 'var(--color-primary)', marginBottom: 16 }}>Secrets Palace</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Lagos&apos;s most luxurious nightlife destination. Where every guest is royalty. Wednesday to Sunday, 10PM–6AM.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <a href="#" style={{ width: 40, height: 40, border: '1px solid rgba(212,160,23,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'all 0.3s' }}>IG</a>
            <a href="#" style={{ width: 40, height: 40, border: '1px solid rgba(212,160,23,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'all 0.3s' }}>WA</a>
            <a href="#" style={{ width: 40, height: 40, border: '1px solid rgba(212,160,23,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'all 0.3s' }}>TA</a>
            <a href="#" style={{ width: 40, height: 40, border: '1px solid rgba(212,160,23,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'all 0.3s' }}>TT</a>
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.125rem', color: 'var(--color-primary)', marginBottom: 16 }}>Navigate</h4>
          <Link href="/palace/events" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2, textDecoration: 'none', display: 'block', transition: 'color 0.2s' }}>Events</Link>
          <Link href="/palace/reserve" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2, textDecoration: 'none', display: 'block', transition: 'color 0.2s' }}>Reserve a Table</Link>
          <Link href="/palace" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2, textDecoration: 'none', display: 'block', transition: 'color 0.2s' }}>Home</Link>
          <Link href="/account-hub" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2, textDecoration: 'none', display: 'block', transition: 'color 0.2s' }}>My Account</Link>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.125rem', color: 'var(--color-primary)', marginBottom: 16 }}>Contact</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2 }}>148 Lekki-Epe Expressway</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2 }}>Lekki Phase 1, Lagos</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2 }}>+234 800 SECRETS</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2 }}>info@secrets-palace.com</p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.125rem', color: 'var(--color-primary)', marginBottom: 16 }}>Dress Code</h4>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2 }}>Smart Elegance Required</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2 }}>No slippers · No caps</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2 }}>Management reserves right</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 2 }}>of admission</p>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid rgba(173,173,200,0.08)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
        <span>© 2025 Secrets Palace · FoliXx Hospitality Group</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.75rem' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.75rem' }}>Terms of Service</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .pfooter-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </footer>
  );
}
