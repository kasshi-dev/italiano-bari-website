import Link from "next/link";

export function Brand({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Link 
      href="/" 
      aria-label="Italiano Bari home" 
      className={`brand brand-original ${compact ? "brand-compact" : ""} ${light ? "brand-light" : ""}`}
    >
      <svg 
        className="brand-logo" 
        width="48" 
        height="48" 
        viewBox="0 0 100 100" 
        style={{ width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0 }}
      >
        <circle cx="50" cy="50" r="50" fill="#2d5a3f" />
        <text 
          x="50%" 
          y="58%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fill="#ffffff" 
          fontSize="32" 
          fontWeight="bold"
          fontFamily="serif"
        >
          IB
        </text>
      </svg>
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
