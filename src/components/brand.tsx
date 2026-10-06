import Link from "next/link";

export function Brand({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Link 
      href="/" 
      aria-label="Italiano Bari home" 
      className={`brand brand-original ${compact ? "brand-compact" : ""} ${light ? "brand-light" : ""}`}
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      {/* Circle Logo Badge */}
      <span 
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: '#2d5a3f',
          color: '#ffffff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          fontFamily: 'serif',
          flexShrink: 0
        }}
      >
        IB
      </span>

      {compact ? (
        <span className="brand-compact-name">Italiano Bari</span>
      ) : (
        <>
          <span className="brand-original-name">Italiano Bari</span>
          <span className="brand-original-caption">TRATTORIA · DAMMAM</span>
          <span className="tricolore" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </>
      )}
    </Link>
  );
}
